from django import forms
from django.forms import ModelForm
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Submit
from django.core.exceptions import ValidationError


class QuoteForm(forms.Form):
    def only_int(value): 
        if value.isdigit()==False:
            raise ValidationError('ID contains characters')
            
    gallons_requested = forms.CharField(validators=[only_int])
    delivery_address = forms.CharField()
    delivery_date = forms.DateField(widget=forms.DateInput(attrs={'class':'datepicker'}))
    suggested_price = forms.CharField(required=False)
    amount_due = forms.CharField(required=False)

    

    def __init__(self,*args,**kwargs):
        super().__init__(*args,**kwargs)

        self.helper = FormHelper
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            'gallons_requested',
            'gallons_requested',
            'delivery_date',
            'suggested_price',
            'amount_due',
            Submit('submit','Submit', css_class = 'btn-success')
        )

    def calculateAmount_due():
        return 0

    



