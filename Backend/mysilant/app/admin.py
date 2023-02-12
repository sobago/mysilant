from django.contrib import admin
from rangefilter.filters import DateRangeFilter
from .models import *
### Filters for admin panel

class MachineModelFilter(admin.SimpleListFilter):
    title = 'Модель техники'
    parameter_name = 'machinemodel'

    def lookups(self, request, model_admin):
        filter = set([m for m in Directory.objects.filter(name='MOD')])
        return [(m.id, m.title) for m in filter]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(machine_model__id=self.value())
        else:
            return queryset


class EngineModelFilter(admin.SimpleListFilter):
    title = 'Модель двигателя'
    parameter_name = 'enginemodel'

    def lookups(self, request, model_admin):
        filter = set([m for m in Directory.objects.filter(name='ENG')])
        return [(m.id, m.title) for m in filter]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(engine_model__id=self.value())
        else:
            return queryset


class TransmissionModelFilter(admin.SimpleListFilter):
    title = 'Модель трансмиссии'
    parameter_name = 'transmissionmodel'

    def lookups(self, request, model_admin):
        filter = set([m for m in Directory.objects.filter(name='TRA')])
        return [(m.id, m.title) for m in filter]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(transmission_model__id=self.value())
        else:
            return queryset


class DrAxleModelFilter(admin.SimpleListFilter):
    title = 'Модель ведущего моста'
    parameter_name = 'driveaxlemodel'

    def lookups(self, request, model_admin):
        filter = set([m for m in Directory.objects.filter(name='DAX')])
        return [(m.id, m.title) for m in filter]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(drive_axle_model__id=self.value())
        else:
            return queryset


class StAxleModelFilter(admin.SimpleListFilter):
    title = 'Модель управляемого моста'
    parameter_name = 'steeraxlemodel'

    def lookups(self, request, model_admin):
        filter = set([m for m in Directory.objects.filter(name='SAX')])
        return [(m.id, m.title) for m in filter]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(steer_axle_model__id=self.value())
        else:
            return queryset


class RecoveryMethodFilter(admin.SimpleListFilter):
    title = 'Способ восстановления'
    parameter_name = 'recovmethod'

    def lookups(self, request, model_admin):
        filter = set([m for m in Directory.objects.filter(name='RMT')])
        return [(m.id, m.title) for m in filter]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(recovery_method__id=self.value())
        else:
            return queryset


class ServiceCenterFilter(admin.SimpleListFilter):
    title = 'Сервисная организация'
    parameter_name = 'servicecenter'

    def lookups(self, request, model_admin):
        filter = set([m for m in User.objects.filter(groups__name="Сервисная организация")])
        return [(m.id, f'{m.first_name} {m.last_name}') for m in filter]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(service_center__id=self.value())
        else:
            return queryset


class ServiceTypeFilter(admin.SimpleListFilter):
    title = 'Вид ТО'
    parameter_name = 'servicetype'

    def lookups(self, request, model_admin):
        filter = set([m for m in Directory.objects.filter(name='STP')])
        return [(m.id, m.title) for m in filter]

    def queryset(self, request, queryset):
        if self.value():
            return queryset.filter(service_type__id=self.value())
        else:
            return queryset

### end filters


class DirectoryAdmin(admin.ModelAdmin):
    list_display = ('name', 'title', 'description')
    list_filter = ('name',)
    search_fields = ('title',)


class MachineAdmin(admin.ModelAdmin):
    list_display = ('machine_number',
                    'machine_model',
                    'shipping_date',
                    'customer',
                    'service_center')
    list_filter = (MachineModelFilter,
                   EngineModelFilter,
                   TransmissionModelFilter,
                   DrAxleModelFilter,
                   StAxleModelFilter)
    search_fields = ('machine_number', 'customer', 'service_center')

    def render_change_form(self, request, context, *args, **kwargs):
        context['adminform'].form.fields['machine_model'].queryset = Directory.objects.filter(name='MOD')
        context['adminform'].form.fields['engine_model'].queryset = Directory.objects.filter(name='ENG')
        context['adminform'].form.fields['transmission_model'].queryset = Directory.objects.filter(name='TRA')
        context['adminform'].form.fields['drive_axle_model'].queryset = Directory.objects.filter(name='DAX')
        context['adminform'].form.fields['steer_axle_model'].queryset = Directory.objects.filter(name='SAX')
        context['adminform'].form.fields['customer'].queryset = User.objects.filter(groups__name="Клиент")
        context['adminform'].form.fields['service_center'].queryset = User.objects.filter(groups__name="Сервисная организация")
        return super(MachineAdmin, self).render_change_form(request, context, *args, **kwargs)

    

class TechnicalServiceAdmin(admin.ModelAdmin):
    list_display = ('date',
                    'service_type',
                    'order',
                    'service_center',
                    'machine')
    list_filter = (('date', DateRangeFilter),
                   ServiceTypeFilter,
                   'machine__machine_number',
                   ServiceCenterFilter)
    search_fields = ('machine',)

    def render_change_form(self, request, context, *args, **kwargs):
        context['adminform'].form.fields['service_type'].queryset = Directory.objects.filter(name='STP')
        context['adminform'].form.fields['service_center'].queryset = User.objects.filter(groups__name="Сервисная организация")
        return super(TechnicalServiceAdmin, self).render_change_form(request, context, *args, **kwargs)



class ComplaintAdmin(admin.ModelAdmin):
    list_display = ('date',
                    'duration',
                    'unit',
                    'recovery_method',
                    'recovery_date',
                    'machine',
                    'service_center')
    list_filter = (('date', DateRangeFilter),
                   RecoveryMethodFilter,
                   ServiceCenterFilter,
                   'machine__machine_number')
    search_fields = ('machine',)

    def render_change_form(self, request, context, *args, **kwargs):
        context['adminform'].form.fields['unit'].queryset = Directory.objects.filter(name='BRU')
        context['adminform'].form.fields['recovery_method'].queryset = Directory.objects.filter(name='RMT')
        context['adminform'].form.fields['service_center'].queryset = User.objects.filter(groups__name="Сервисная организация")
        return super(ComplaintAdmin, self).render_change_form(request, context, *args, **kwargs)


# class MyUserAdmin(admin.ModelAdmin):

#     def group(self, user):
#         groups = []
#         for group in user.groups.all():
#             groups.append(group.name)
#         return ', '.join(groups)
#     group.short_description = 'Группы'

#     list_display = ['first_name', 'last_name', 'username', 'is_active', 'is_staff', 'last_login', 'email', 'group']
#     list_filter = ['is_staff', 'is_active', 'groups']
#     search_fields = ('first_name', 'last_name', 'username', 'email')
#     ordering = ('groups', 'username')
    

# admin.site.unregister(User)
# admin.site.register(User, MyUserAdmin)


admin.site.register(Directory, DirectoryAdmin)
admin.site.register(Machine, MachineAdmin)
admin.site.register(TechnicalService, TechnicalServiceAdmin)
admin.site.register(Complaint, ComplaintAdmin)
