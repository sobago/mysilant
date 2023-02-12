from django_filters import rest_framework as filters
from .models import Machine

class MachineFilter(filters.FilterSet):
    machine_model = filters.CharFilter(field_name='machine_model__title', lookup_expr='icontains')
    engine_model = filters.CharFilter(field_name='engine_model__title', lookup_expr='icontains')
    transmission_model = filters.CharFilter(field_name='transmission_model__title', lookup_expr='icontains')
    drive_axle_model = filters.CharFilter(field_name='drive_axle_model__title', lookup_expr='icontains')
    steer_axle_model = filters.CharFilter(field_name='steer_axle_model__title', lookup_expr='icontains')


class TechnicalServiceFilter(filters.FilterSet):
    service_type = filters.CharFilter(field_name='service_type__title', lookup_expr='icontains')
    service_center = filters.CharFilter(field_name='service_center__first_name', lookup_expr='icontains')
    machine = filters.CharFilter(field_name='machine__machine_number', lookup_expr='iexact')


class ComplaintFilter(filters.FilterSet):
    machine = filters.CharFilter(field_name='machine__machine_number', lookup_expr='iexact')
    unit = filters.CharFilter(field_name='unit__title', lookup_expr='icontains')
    recovery_method = filters.CharFilter(field_name='recovery_method__title', lookup_expr='icontains')
    service_center = filters.CharFilter(field_name='service_center__first_name', lookup_expr='icontains')


class UserFilter(filters.FilterSet):
    first_name = filters.CharFilter(field_name='first_name', lookup_expr='icontains')
    username = filters.CharFilter(field_name='username', lookup_expr='icontains')
