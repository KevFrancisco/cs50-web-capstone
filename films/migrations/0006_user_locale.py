# Generated by Django 3.1.2 on 2020-12-06 00:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('films', '0005_auto_20201205_2239'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='locale',
            field=models.CharField(default='US', max_length=2),
            preserve_default=False,
        ),
    ]
