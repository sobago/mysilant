from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes, renderer_classes
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAuthenticatedOrReadOnly, IsAdminUser
from rest_framework.authentication import SessionAuthentication
from .serializers import *
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import Group
from .models import *
from .filters import MachineFilter, TechnicalServiceFilter, ComplaintFilter, UserFilter
from rest_framework import status, generics


@api_view(['POST'])
@permission_classes([AllowAny])
def log_in(request: Request):
    serializer = LoginRequestSerializer(data=request.data)
    if serializer.is_valid():
        authenticated_user = authenticate(**serializer.validated_data)
        if authenticated_user is not None:
            login(request, authenticated_user)
            return Response({'status': 'Success'})
        else:
            return Response({'error': "Invalid credentials"}, status=403)
    else:
        return Response(serializer.errors, status=400)

@api_view()
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def user(request: Request):
    return Response({
        'data': UserSerializer(request.user).data
    })

@api_view(['GET'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def users(request: Request):
    users = User.objects.all()
    serializer = UserCutSerializer(users, many=True)
    return Response(serializer.data)


@api_view(['GET', 'POST'])
@permission_classes([IsAdminUser])
@authentication_classes([SessionAuthentication])
def users_admin(request: Request):
    if request.method == 'GET':
        users = User.objects.all()
        filterset = UserFilter(request.GET, queryset=users)
        if filterset.is_valid():
            users = filterset.qs
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
        else:
            return Response(serializer.errors, status=400)

    return Response(serializer.data)

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])
@authentication_classes([SessionAuthentication])
def log_out(request: Request):
    logout(request)
    return Response({'status': 'Success'})

@api_view(['POST'])
def get_machine_id(request: Request):
    if request.data:
        try:
            machine = Machine.objects.get(machine_number=request.data['machine_number'])
            return Response({
                'data': MachineSerializerAnonym(machine).data
            })
        except Machine.DoesNotExist or KeyError:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(status=status.HTTP_404_NOT_FOUND)


class MachineList(generics.ListCreateAPIView):
    """
    List or create machines
    """
    authentication_classes = (SessionAuthentication,)
    permission_classes = [IsAuthenticated,]
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer
    filterset_class = MachineFilter
    
    def list(self, request, *args, **kwargs):
        clientgroup = Group.objects.get(name='Клиент')
        servicegroup = Group.objects.get(name='Сервисная организация')
        
        if request.user.is_staff:
            queryset = self.filter_queryset(self.get_queryset())
            serializer = self.get_serializer(queryset, many=True)
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            return Response(serializer.data)
        elif servicegroup in request.user.groups.all():
            queryset = self.filter_queryset(self.get_queryset()).filter(service_center=request.user)
            serializer = self.get_serializer(queryset, many=True)
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            return Response(serializer.data)
        elif clientgroup in request.user.groups.all():
            queryset = self.filter_queryset(self.get_queryset()).filter(customer=request.user)
            serializer = self.get_serializer(queryset, many=True)
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)
    
    def post(self, request, *args, **kwargs):
        if request.user.is_staff:
            return super().post(request, *args, **kwargs)
        else:
            return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)

class MachineDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete machine
    """
    clientgroup = Group.objects.get(name='Клиент')
    servicegroup = Group.objects.get(name='Сервисная организация')
    queryset = Machine.objects.all()
    serializer_class = MachineSerializer

    def retrieve(self, request, *args, **kwargs):
        if request.user.is_staff:
            # if user is staff (mnager) - return full obj
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        elif self.servicegroup in request.user.groups.all():
            instance = self.get_object()
            if instance.service_center == request.user:
                # if user is Service and assigned to the machine - return full obj
                serializer = self.get_serializer(instance)
                return Response(serializer.data)
            else:
                instance = self.get_object()
                serializer = MachineSerializerAnonym(instance)
                return Response(serializer.data)
        elif self.clientgroup in request.user.groups.all():
            instance = self.get_object()
            if instance.customer == request.user:
                # if user is client and customer - return full obj
                serializer = self.get_serializer(instance)
                return Response(serializer.data)
            else:
                instance = self.get_object()
                serializer = MachineSerializerAnonym(instance)
                return Response(serializer.data)
        else:
            # for everyone else - return truncated data
            instance = self.get_object()
            serializer = MachineSerializerAnonym(instance)
            return Response(serializer.data)
        

    def update(self, request, *args, **kwargs):
        if request.user.is_staff:
            return super().update(request, *args, **kwargs)
        else:
            return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)
    
    def destroy(self, request, *args, **kwargs):
        if request.user.is_staff:
            return super().destroy(request, *args, **kwargs)
        else:
            return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)


class TechnicalServiceList(generics.ListCreateAPIView):
    """
    List or create a technical services
    """
    authentication_classes = (SessionAuthentication,)
    permission_classes = [IsAuthenticated,]
    queryset = TechnicalService.objects.all()
    serializer_class = TechnicalServiceSerializer
    filterset_class = TechnicalServiceFilter
    clientgroup = Group.objects.get(name='Клиент')
    servicegroup = Group.objects.get(name='Сервисная организация')

    def list(self, request, *args, **kwargs):
        if request.user.is_staff:
            queryset = self.filter_queryset(self.get_queryset())
            serializer = self.get_serializer(queryset, many=True)
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            return Response(serializer.data)
        elif self.servicegroup in request.user.groups.all():
            queryset = self.filter_queryset(self.get_queryset()).filter(machine__service_center=request.user)
            serializer = self.get_serializer(queryset, many=True)
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            return Response(serializer.data)
        elif self.clientgroup in request.user.groups.all():
            queryset = self.filter_queryset(self.get_queryset()).filter(machine__customer=request.user)
            serializer = self.get_serializer(queryset, many=True)
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)
    
    def post(self, request, *args, **kwargs):
        if request.user.is_staff or \
              self.servicegroup in request.user.groups.all() or \
                self.clientgroup in request.user.groups.all():
            return super().post(request, *args, **kwargs)
        else:
            return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)


class TechnicalServiceDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete technical service
    """
    clientgroup = Group.objects.get(name='Клиент')
    servicegroup = Group.objects.get(name='Сервисная организация')
    authentication_classes = (SessionAuthentication,)
    permission_classes = [IsAuthenticated,]
    queryset = TechnicalService.objects.all()
    serializer_class = TechnicalServiceSerializer

    def retrieve(self, request, *args, **kwargs):
        if request.user.is_staff:
            # if user is staff (mnager) - return full obj
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        elif self.servicegroup in request.user.groups.all():
            instance = self.get_object()
            if instance.machine.service_center == request.user:
                # if user is Service and assigned to the machine - return full obj
                serializer = self.get_serializer(instance)
                return Response(serializer.data)
            else:
                return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)
        elif self.clientgroup in request.user.groups.all():
            instance = self.get_object()
            if instance.machine.customer == request.user:
                # if user is client and customer - return full obj
                serializer = self.get_serializer(instance)
                return Response(serializer.data)
            else:
                return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)
        

    def update(self, request, *args, **kwargs):
        if request.user.is_staff:
            return super().update(request, *args, **kwargs)
        elif self.servicegroup in request.user.groups.all():
            instance = self.get_object()
            if instance.machine.service_center == request.user:
                return super().update(request, *args, **kwargs)
            else:
                return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)
        elif self.clientgroup in request.user.groups.all():
            instance = self.get_object()
            if instance.machine.customer == request.user:
                return super().update(request, *args, **kwargs)
            else:
                return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)

    
    def destroy(self, request, *args, **kwargs):
        if request.user.is_staff:
            return super().destroy(request, *args, **kwargs)
        elif self.servicegroup in request.user.groups.all():
            instance = self.get_object()
            if instance.machine.service_center == request.user:
                return super().destroy(request, *args, **kwargs)
            else:
                return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)
        elif self.clientgroup in request.user.groups.all():
            instance = self.get_object()
            if instance.machine.customer == request.user:
                return super().destroy(request, *args, **kwargs)
            else:
                return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)


class ComplaintList(generics.ListCreateAPIView):
    """
    List or create a complaints
    """
    authentication_classes = (SessionAuthentication,)
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer
    filterset_class = ComplaintFilter

    def get_permissions(self):
        if self.request.method == 'GET':
            perms = [IsAuthenticated,]
        else:
            perms = [IsAdminUser,]
        return [p() for p in perms]

    def list(self, request, *args, **kwargs):
        clientgroup = Group.objects.get(name='Клиент')
        servicegroup = Group.objects.get(name='Сервисная организация')
        
        if request.user.is_staff:
            queryset = self.filter_queryset(self.get_queryset())
            serializer = self.get_serializer(queryset, many=True)
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            return Response(serializer.data)
        elif servicegroup in request.user.groups.all():
            queryset = self.filter_queryset(self.get_queryset()).filter(machine__service_center=request.user)
            serializer = self.get_serializer(queryset, many=True)
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            return Response(serializer.data)
        elif clientgroup in request.user.groups.all():
            queryset = self.filter_queryset(self.get_queryset()).filter(machine__customer=request.user)
            serializer = self.get_serializer(queryset, many=True)
            page = self.paginate_queryset(queryset)
            if page is not None:
                serializer = self.get_serializer(page, many=True)
                return self.get_paginated_response(serializer.data)
            return Response(serializer.data)
        else:
            return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)


class ComplaintDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete a complaint
    """
    clientgroup = Group.objects.get(name='Клиент')
    servicegroup = Group.objects.get(name='Сервисная организация')
    authentication_classes = (SessionAuthentication,)
    permission_classes = [IsAuthenticated,]
    queryset = Complaint.objects.all()
    serializer_class = ComplaintSerializer

    def retrieve(self, request, *args, **kwargs):
        if request.user.is_staff:
            # if user is staff (mnager) - return full obj
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        elif self.servicegroup in request.user.groups.all():
            instance = self.get_object()
            if instance.machine.service_center == request.user:
                # if user is Service and assigned to the machine - return full obj
                serializer = self.get_serializer(instance)
                return Response(serializer.data)
            else:
                return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)
        elif self.clientgroup in request.user.groups.all():
            instance = self.get_object()
            if instance.machine.customer == request.user:
                # if user is client and customer - return full obj
                serializer = self.get_serializer(instance)
                return Response(serializer.data)
            else:
                return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)
        

    def update(self, request, *args, **kwargs):
        if request.user.is_staff:
            return super().update(request, *args, **kwargs)
        elif self.servicegroup in request.user.groups.all():
            instance = self.get_object()
            if instance.machine.service_center == request.user:
                return super().update(request, *args, **kwargs)
            else:
                return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)

    
    def destroy(self, request, *args, **kwargs):
        if request.user.is_staff:
            return super().destroy(request, *args, **kwargs)
        elif self.servicegroup in request.user.groups.all():
            instance = self.get_object()
            if instance.machine.service_center == request.user:
                return super().destroy(request, *args, **kwargs)
            else:
                return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)
        else:
            return Response({'detail': 'Доступ запрещен'},status=status.HTTP_403_FORBIDDEN)


class DirectoryList(generics.ListCreateAPIView):
    """
    List directory or create new
    """
    queryset = Directory.objects.all()
    serializer_class = DirectorySerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            perms = [AllowAny,]
        else:
            perms = [IsAdminUser,]
        return [p() for p in perms]


class DirectoryDetail(generics.RetrieveUpdateDestroyAPIView):
    """
    Retrieve, update or delete directory
    """
    queryset = Directory.objects.all()
    serializer_class = DirectorySerializer

    def get_permissions(self):
        if self.request.method == 'GET':
            perms = [AllowAny,]
        else:
            perms = [IsAdminUser,]
        return [p() for p in perms]

class UsersChange(generics.RetrieveUpdateDestroyAPIView):
    """
    Update or delete user
    """
    authentication_classes = (SessionAuthentication,)
    permission_classes = [IsAdminUser,]
    queryset = User.objects.all()
    serializer_class = UserUpdateSerializer


