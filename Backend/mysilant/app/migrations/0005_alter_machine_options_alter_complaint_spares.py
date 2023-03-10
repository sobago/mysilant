# Generated by Django 4.1.5 on 2023-01-25 21:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_alter_machine_options_alter_directory_title'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='machine',
            options={'ordering': ['-shipping_date'], 'verbose_name': 'Машина', 'verbose_name_plural': 'Машины'},
        ),
        migrations.AlterField(
            model_name='complaint',
            name='spares',
            field=models.CharField(blank=True, max_length=512, verbose_name='Используемые запасные части'),
        ),
    ]
