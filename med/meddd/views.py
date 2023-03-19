from rest_framework import viewsets
from .serializers import StockSerializer, OrderSerializer, StockFilter, ChartSerializer, UserSerializer
from .models import Stock, Order, Chart, AuthUser
from django_filters.rest_framework import DjangoFilterBackend
from django.conf import settings
from rest_framework import permissions



class StockViewSet(viewsets.ModelViewSet):

    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Stock.objects.all()
    serializer_class = StockSerializer
    filter_backends = (DjangoFilterBackend,)
    filterset_class = StockFilter
    search_fields = [ '^disease']
    # Сериализатор для модели
# Create your views here.


class OrderViewSet(viewsets.ModelViewSet):
    """

    """
    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class ChartViewSet(viewsets.ModelViewSet):

    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = Chart.objects.all()
    serializer_class = ChartSerializer


class UserViewSet(viewsets.ModelViewSet):

    # queryset всех пользователей для фильтрации по дате последнего изменения
    queryset = AuthUser.objects.all()
    serializer_class = UserSerializer