from django.shortcuts import render, reverse
from django.http import HttpResponse, HttpResponseRedirect
from django.template import Context, loader
from django.contrib.auth.decorators import login_required
from datetime import datetime, timedelta

from .forms.quote_form import QuoteForm
from .pricing import get_price
from ..models.profile_info import ProfileInfo
from ..models.past_order import PastOrder

msg_submit_success = "Your purchase was successful!"



@login_required
def quote_page(request):
    context = {}

    context["msg_submit_success"] = msg_submit_success

    
    if request.method == 'POST':
        context["form_submitted"] = True

        form = QuoteForm(request.POST)  # Form validation

        gallons = float(form['gallons'].value())
        date = datetime.strptime(form['delivery_date'].value(), "%Y-%m-%d")

        if form.is_valid():
            context["order_success"] = True

            
            try:
                profile = ProfileInfo.objects.get(user_id=request.user.id)
                past_orders = len(
                    PastOrder.objects.filter(user_id=request.user.id)
                )
            except ProfileInfo.DoesNotExist:
                return HttpResponse(None, status='500')

           
            full_address = (profile.address_line_1 + " " +
                            (profile.address_line_2 + " "
                                if profile.address_line_2 != "" else "") +
                            profile.city_name + ", " + profile.state +
                            " " + profile.zip_code)

            if len(full_address) >= 50:
                full_address = full_address[:47] + "..."

            
            prices = get_price(gallons, date, profile, past_orders)

            
            PastOrder.objects.create(
                user_id=request.user.id,
                gallons=gallons,
                delivery_addr=full_address,
                delivery_date=date,
                unit_price=prices[0],
                total_price=prices[1]
            )
        else:
            context["form"] = form

    

    
    context['gallons'] = 10

    delivery_date = datetime.now() + timedelta(days=2)
    context['delivery_date'] = delivery_date

    
    if 'form' in context:
        context['gallons'] = context['form']['gallons'].value()
        context['delivery_date'] = datetime.strptime(
            context['form']['delivery_date'].value(), "%Y-%m-%d")

    
    user_id = request.user.id
    try:
        user_profile = ProfileInfo.objects.get(user_id=user_id)
        context['user_addr_line1'] = user_profile.address_line_1
        context['user_addr_line2'] = user_profile.address_line_2
        context['user_addr_city'] = user_profile.city_name
        context['user_addr_state'] = user_profile.state
        context['user_addr_zip'] = user_profile.zip_code
    except ProfileInfo.DoesNotExist:
        
        return HttpResponseRedirect("/profile?order_needs_profile")

    return render(request, 'fuelLog/quote_request.html', context,
                  content_type='text/html')
