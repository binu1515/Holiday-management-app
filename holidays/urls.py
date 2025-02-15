# project-level urls.py
from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('calapi.urls')),  # Replace 'your_app_name' with the actual app name
    path('', TemplateView.as_view(template_name="index.html"), name="home"),
]