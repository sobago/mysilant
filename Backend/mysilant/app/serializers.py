from rest_framework.serializers import ModelSerializer, \
    Serializer, \
    CharField, \
    SerializerMethodField, \
    IntegerField
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from .models import *


class UserSerializer(ModelSerializer):
    password = CharField(write_only=True,)
    id = IntegerField(read_only=True,)

    class Meta:
        model = User
        fields = [
            'id', 
            'username', 
            'password', 
            'first_name', 
            'last_name', 
            'email', 
            'is_staff', 
            'groups']

    def create(self, validated_data):
        print('create')
        validated_data['password'] = make_password(validated_data['password'])
        if 'groups' in validated_data:
            groups_data = validated_data.pop('groups')
            user = User.objects.create(**validated_data)
            for group in groups_data:
                user.groups.add(group)
            return user
        return super(UserSerializer, self).create(validated_data)

class UserUpdateSerializer(ModelSerializer):
    password = CharField(write_only=True, required=False)
    id = IntegerField(read_only=True,)

    class Meta:
        model = User
        fields = [
            'id', 
            'username', 
            'password', 
            'first_name', 
            'last_name', 
            'email', 
            'is_staff', 
            'groups']
    
    def update(self, instance, validated_data):
        if 'password' in validated_data:
            validated_data['password'] = make_password(validated_data['password'])
        if 'is_staff' in validated_data:
            if validated_data['is_staff'] == 1:
                instance.groups.clear()
        if 'groups' in validated_data:
            groups_data = validated_data.pop('groups')
            instance.groups.clear()
            for group in groups_data:
                instance.groups.add(group)
        return super().update(instance, validated_data)


class UserCutSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'is_staff', 'groups']


class UserServiceSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name']


class LoginRequestSerializer(Serializer):
    model = User
    username = CharField(required=True)
    password = CharField(required=True)


class DirectorySerializer(ModelSerializer):
    name_ = CharField(source='get_name_display', read_only=True)
    class Meta:
        model = Directory
        fields = '__all__'

class MachineSerializer(ModelSerializer):
    class Meta:
        model = Machine
        fields = '__all__'


class MachineSerializerAnonym(ModelSerializer):
    machine_model = DirectorySerializer()
    engine_model = DirectorySerializer()
    transmission_model = DirectorySerializer()
    drive_axle_model = DirectorySerializer()
    steer_axle_model = DirectorySerializer()
    class Meta:
        model = Machine
        fields = [
            'id',
            'machine_model',
            'machine_number',
            'engine_model',
            'engine_number',
            'transmission_model',
            'transmission_number',
            'drive_axle_model',
            'drive_axle_number',
            'steer_axle_model',
            'steer_axle_number'
            ]

        
class TechnicalServiceSerializer(ModelSerializer):
    machine_number = SerializerMethodField()
    class Meta:
        model = TechnicalService
        fields = '__all__'
    
    def get_machine_number(self, obj):
        return obj.machine.machine_number

        
class ComplaintSerializer(ModelSerializer):
    machine_number = SerializerMethodField()
    class Meta:
        model = Complaint
        fields = '__all__'
    
    def get_machine_number(self, obj):
        return obj.machine.machine_number


