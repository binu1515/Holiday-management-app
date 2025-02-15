from django.urls import path
from .views import HolidayAPI

urlpatterns = [
    path('api/', HolidayAPI.as_view(), name='holiday-api'),
]