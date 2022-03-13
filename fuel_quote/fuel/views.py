from django.shortcuts import render
from  .forms import QuoteForm 

# Create your views here.

def quote(request):
    if request.method == 'POST':
        form = QuoteForm(request.POST)
        if form.is_valid():
            gallons_requested = form.cleaned_data['gallons_requested']
            delivery_address = form.cleaned_data['delivery_address']
            delivery_date = form.cleaned_data['delivery_date']

            print(gallons_requested,delivery_address,delivery_date)
    form = QuoteForm()
    return render(request, 'form.html',{'form':form})

def previousQuotes(request):
    if request.method == 'POST':
        form = QuoteForm(request.POST)
        if form.is_valid():
            print('Valid')
    form = QuoteForm()
    return render(request, 'form.html',{'form':form})


        
