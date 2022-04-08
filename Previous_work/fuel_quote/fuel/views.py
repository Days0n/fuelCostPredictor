from django.shortcuts import render
from .import models
from .import forms

# Create your views here.
def quote(request):
    form = forms.HomeForm(request.POST)
    if form.is_valid():
        form.save()
    return render(request, 'quote.html',{'myform': form})

def previous_quotes(request):
    history = models.Quotes.objects.all()
    args = {'history':history}
    return render(request,'previous_quotes.html',args)