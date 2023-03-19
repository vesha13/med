from django.db import models
import datetime

class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()


    class Meta:
        managed = False
        db_table = 'auth_user'


class Stock(models.Model):
    name = models.CharField(max_length=50, verbose_name="Название лекарства")
    disease = models.CharField(max_length=255, verbose_name="Назначение")
    price = models.IntegerField(verbose_name="Цена")
    prescript = models.BooleanField(verbose_name="Нужен рецепт?")
    date_modified = models.DateTimeField(auto_now=True, verbose_name="Когда последний раз обновлялась информация?")


class Order(models.Model):
    product = models.CharField(max_length=50, verbose_name="Название лекарства")
    auth_user = models.CharField(max_length=50, verbose_name="Пользователь")
    quantity = models.IntegerField(default=1)
    price = models.IntegerField()
    address = models.CharField(max_length=50, default='', blank=True)
    status = models.CharField(max_length=50, default='Сформирован')

# Create your models here.
class Chart(models.Model):
    product = models.CharField(max_length=50, verbose_name="Название лекарства")
    auth_user = models.CharField(max_length=50, verbose_name="Пользователь")
    quantity = models.IntegerField(default=1)
    price = models.IntegerField()
    address = models.CharField(max_length=50, default='', blank=True)
    status = models.CharField(max_length=50, default='Сформирован')
    date_modified = models.DateTimeField(auto_now=True, verbose_name="Когда последний раз обновлялась информация?")


