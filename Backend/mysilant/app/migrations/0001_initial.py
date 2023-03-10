# Generated by Django 4.1.5 on 2023-01-25 13:58

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Directory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(choices=[('MOD', 'Модель техники'), ('ENG', 'Модель двигателя'), ('TRA', 'Модель трансмиссии'), ('DAX', 'Модель ведущего моста'), ('SAX', 'Модель управляемого моста'), ('STP', 'Вид ТО'), ('BRU', 'Узел отказа'), ('RMT', 'Способ восстановления')], max_length=3, verbose_name='Название справочника')),
                ('title', models.CharField(max_length=128, verbose_name='Название')),
                ('description', models.CharField(blank=True, max_length=256, verbose_name='Описание')),
            ],
        ),
        migrations.CreateModel(
            name='Machine',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('machine_number', models.CharField(blank=True, max_length=128, verbose_name='Зав. № машины')),
                ('engine_number', models.CharField(blank=True, max_length=128, verbose_name='Зав. № двигателя')),
                ('transmission_number', models.CharField(blank=True, max_length=128, verbose_name='Зав. № трансмиссии')),
                ('drive_axle_number', models.CharField(blank=True, max_length=128, verbose_name='Зав. № ведущего моста')),
                ('steer_axle_number', models.CharField(blank=True, max_length=128, verbose_name='Зав. № управляемого моста')),
                ('supply_contract', models.CharField(blank=True, max_length=128, verbose_name='Договор поставки №, дата')),
                ('shipping_date', models.DateField(blank=True, verbose_name='Дата отгрузки с завода')),
                ('consignee', models.CharField(blank=True, max_length=256, verbose_name='Грузополучатель (конечный потребитель)')),
                ('delivery_address', models.CharField(blank=True, max_length=256, verbose_name='Адрес поставки (эксплуатации)')),
                ('additional', models.CharField(blank=True, max_length=256, verbose_name='Комплектация (доп. опции)')),
                ('customer', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='machine_customer', to=settings.AUTH_USER_MODEL, verbose_name='Клиент')),
                ('drive_axle_model', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='machine_drive_axle_model', to='app.directory', verbose_name='Модель ведущего моста')),
                ('engine_model', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='machine_engine_model', to='app.directory', verbose_name='Модель двигателя')),
                ('machine_model', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='machine_model', to='app.directory', verbose_name='Модель техники')),
                ('service_center', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='machine_service_center', to=settings.AUTH_USER_MODEL, verbose_name='Сервисная компания')),
                ('steer_axle_model', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='machine_steer_axle_model', to='app.directory', verbose_name='Модель управляемого моста')),
                ('transmission_model', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='machine_transmission_model', to='app.directory', verbose_name='Модель трансмиссии')),
            ],
        ),
        migrations.CreateModel(
            name='TechnicalService',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(verbose_name='Дата проведения ТО')),
                ('duration', models.IntegerField(default=0, verbose_name='Наработка, м/час')),
                ('order', models.CharField(blank=True, max_length=128, verbose_name='№ заказ-наряда')),
                ('order_date', models.DateField(verbose_name='Дата заказ-наряда')),
                ('machine', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.machine', verbose_name='Машина')),
                ('service_center', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL, verbose_name='Сервисная компания')),
                ('service_type', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='app.directory', verbose_name='Вид ТО')),
            ],
        ),
        migrations.CreateModel(
            name='Complaint',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(verbose_name='Дата отказа')),
                ('duration', models.IntegerField(default=0, verbose_name='Наработка, м/час')),
                ('description', models.CharField(max_length=512, verbose_name='Описание отказа')),
                ('spares', models.CharField(max_length=512, verbose_name='Используемые запасные части')),
                ('recovery_date', models.DateField(verbose_name='Дата восстановления')),
                ('downtime', models.IntegerField(verbose_name='Время простоя')),
                ('machine', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='app.machine', verbose_name='Машина')),
                ('recovery_method', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='complaint_recovery_method', to='app.directory', verbose_name='Способ восстановления')),
                ('service_center', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL, verbose_name='Сервисная компания')),
                ('unit', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, related_name='complaint_unit', to='app.directory', verbose_name='Узел отказа')),
            ],
        ),
    ]
