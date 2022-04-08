from django.shortcuts import render, reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.template import Context, loader
from datetime import datetime, timedelta
from django.contrib.auth.decorators import login_required
import json

def get_price(gallons):

    return