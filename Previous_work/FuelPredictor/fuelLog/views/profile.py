from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import Context, loader
from django.contrib.auth.decorators import login_required
from django import forms

def profile_page(request):
    return render(request, 'fuelLog/profile.html')