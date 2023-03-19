from django.contrib import admin
# Register your models here.
from .models import Order, Stock

admin.site.register(Stock)
admin.site.register(Order)
