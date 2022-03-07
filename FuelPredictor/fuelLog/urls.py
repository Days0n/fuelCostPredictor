from django.urls import path, re_path
from django.urls import re_path as url
from . import views

# Index / Landing page
urlpatterns = [
    path('', views.index_page, name='index_page'),
    path('index', views.index_page, name='index_page')
]

# Login page
urlpatterns += [
    path('login', views.login_page, name='login_page'),
    path('logout', views.logout_page, name='logout_page'),
]

# Profile page
urlpatterns += [
    path('profile', views.profile_page, name='profile_page')
]