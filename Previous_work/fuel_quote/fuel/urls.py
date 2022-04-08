from django.urls import path
from . import views

urlpatterns = [
    path('', views.quote, name='quote'),
    path('previous',views.previous_quotes, name = 'previous')
]