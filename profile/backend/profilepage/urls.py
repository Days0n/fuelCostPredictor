from django.urls import path
from . import views

#URLConf
urlpatterns = [
    path('', views.view_profile, name="profile"),
]