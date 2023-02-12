from django.db import models
from django.contrib.auth.models import User

class Directory(models.Model):
    MODEL = 'MOD'
    ENGINE = 'ENG'
    TRANSMISSION = 'TRA'
    DRIVE_AXLE = 'DAX'
    STEER_AXLE = 'SAX'
    SERVICE_TYPE = 'STP'
    BROKEN_UNIT = 'BRU'
    RECOVERY_METHOD = 'RMT'
    DIRECTORY_NAME_CHOICES = [
        (MODEL, 'Модель техники'),
        (ENGINE, 'Модель двигателя'),
        (TRANSMISSION, 'Модель трансмиссии'),
        (DRIVE_AXLE, 'Модель ведущего моста'),
        (STEER_AXLE, 'Модель управляемого моста'),
        (SERVICE_TYPE, 'Вид ТО'),
        (BROKEN_UNIT, 'Узел отказа'),
        (RECOVERY_METHOD, 'Способ восстановления'),
    ]
   
    name = models.CharField(max_length=3, choices=DIRECTORY_NAME_CHOICES, verbose_name="Название справочника")
    title = models.CharField(max_length=128, verbose_name="Название", unique=True)
    description = models.CharField(max_length=256, blank=True, verbose_name="Описание")

    class Meta:
        ordering = ["name", "title"]
        verbose_name = "Справочник"
        verbose_name_plural = "Справочники"

    def __str__(self):
        return self.title


class Machine(models.Model):
    machine_model = models.ForeignKey(Directory, on_delete=models.PROTECT, related_name="machine_model", verbose_name='Модель техники')
    machine_number = models.CharField(max_length=128, blank=True, verbose_name="Зав. № машины", unique=True)
    engine_model = models.ForeignKey(Directory, on_delete=models.PROTECT, related_name="machine_engine_model", verbose_name="Модель двигателя")
    engine_number = models.CharField(max_length=128, blank=True, verbose_name="Зав. № двигателя", unique=True)
    transmission_model = models.ForeignKey(Directory, on_delete=models.PROTECT, related_name="machine_transmission_model", verbose_name="Модель трансмиссии")
    transmission_number = models.CharField(max_length=128, blank=True, verbose_name="Зав. № трансмиссии", unique=True)
    drive_axle_model = models.ForeignKey(Directory, on_delete=models.PROTECT, related_name="machine_drive_axle_model", verbose_name="Модель ведущего моста")
    drive_axle_number = models.CharField(max_length=128, blank=True, verbose_name="Зав. № ведущего моста", unique=True)
    steer_axle_model = models.ForeignKey(Directory, on_delete=models.PROTECT,related_name="machine_steer_axle_model", verbose_name="Модель управляемого моста")
    steer_axle_number = models.CharField(max_length=128, blank=True, verbose_name="Зав. № управляемого моста", unique=True)
    supply_contract = models.CharField(max_length=128, blank=True, verbose_name="Договор поставки №, дата")
    shipping_date = models.DateField(verbose_name="Дата отгрузки с завода", blank=True)
    consignee = models.CharField(max_length=256, blank=True, verbose_name="Грузополучатель (конечный потребитель)")
    delivery_address = models.CharField(max_length=256, blank=True, verbose_name="Адрес поставки (эксплуатации)")
    additional = models.TextField(max_length=256, blank=True, verbose_name="Комплектация (доп. опции)")
    customer = models.ForeignKey(User, on_delete=models.PROTECT, related_name="machine_customer", verbose_name='Клиент')
    service_center = models.ForeignKey(User, on_delete=models.PROTECT, related_name="machine_service_center", verbose_name='Сервисная компания')

    class Meta:
        ordering = ["-shipping_date"]
        verbose_name = "Машина"
        verbose_name_plural = "Машины"

    def __str__(self):
        return f'{self.machine_number} {self.machine_model}'


class TechnicalService(models.Model):
    service_type = models.ForeignKey(Directory, on_delete=models.PROTECT, verbose_name="Вид ТО")
    date = models.DateField(verbose_name="Дата проведения ТО")
    duration = models.IntegerField(default=0, verbose_name="Наработка, м/час")
    order = models.CharField(max_length=128, blank=True, verbose_name="№ заказ-наряда")
    order_date = models.DateField(verbose_name="Дата заказ-наряда")
    service_center = models.ForeignKey(User, on_delete=models.PROTECT, verbose_name='Сервисная компания')
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, related_name="technisalservices", verbose_name="Машина")

    class Meta:
        ordering = ["-date"]
        verbose_name = "ТО"
        verbose_name_plural = "ТО"

    def __str__(self):
        return f'{self.order} {self.service_type}'


class Complaint(models.Model):
    date = models.DateField(verbose_name="Дата отказа")
    duration = models.IntegerField(default=0, verbose_name="Наработка, м/час")
    unit = models.ForeignKey(Directory, on_delete=models.PROTECT, related_name="complaint_unit", verbose_name="Узел отказа")
    description = models.CharField(max_length=512, verbose_name="Описание отказа")
    recovery_method = models.ForeignKey(Directory, on_delete=models.PROTECT, related_name="complaint_recovery_method", verbose_name="Способ восстановления")
    spares = models.CharField(max_length=512, blank=True, verbose_name="Используемые запасные части")
    recovery_date = models.DateField(verbose_name="Дата восстановления")
    downtime = models.IntegerField(verbose_name="Время простоя")
    machine = models.ForeignKey(Machine, on_delete=models.CASCADE, verbose_name="Машина")
    service_center = models.ForeignKey(User, on_delete=models.PROTECT, verbose_name='Сервисная компания')

    class Meta:
        ordering = ["-date"]
        verbose_name = "Рекламация"
        verbose_name_plural = "Рекламации"

    def __str__(self):
        return f'{self.machine} {self.date} {self.unit}'


## change username to first and last name
def get_name(self):
    return '{} {}'.format(self.first_name, self.last_name)

User.add_to_class("__str__", get_name)

