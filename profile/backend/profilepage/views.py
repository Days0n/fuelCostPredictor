from re import X
from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def view_profile(request):
    # return render(request, 'profile.html',{'name':'Davidson'})
    context = {
        'user': request.user
    }
    return render(request, 'profile.html', context)