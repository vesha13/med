from .models import Stock, Order, Chart, AuthUser
from rest_framework import serializers
from django_filters import rest_framework as filters


class StockSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Stock
        # Поля, которые мы сериализуем
        fields = ["pk",  "name", "disease", "price", "prescript", "date_modified"]


class NumFilterMinMaxFilter(filters.BaseInFilter, filters.NumberFilter, filters.CharFilter):
    pass

class StockFilter(filters.FilterSet):

     pass
     max_pr = filters.NumberFilter(field_name='price', lookup_expr='lte')
     min_pr = filters.NumberFilter(field_name='price', lookup_expr='gte')
     search = filters.CharFilter(field_name='disease', lookup_expr='icontains')
     class Meta:
         model = Stock
         fields = ['price', 'disease']



class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order

    # Поля, которые мы сериализуем
    fields = ["pk", "product", "auth_user", "quantity", "price", "address", "status"]

class ChartSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = Chart
        # Поля, которые мы сериализуем
        fields = ["pk",  "product", "auth_user", "quantity", "price","address", "status", "date_modified"]

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # Модель, которую мы сериализуем
        model = AuthUser
        # Поля, которые мы сериализуем
        fields = ["pk",  "password", "last_login", "is_superuser", "username","first_name", "last_name", "email", "is_staff", "is_active", "date_joined"]