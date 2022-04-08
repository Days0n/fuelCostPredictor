from tkinter import Widget
from django import forms
from .import models

class HomeForm(forms.ModelForm):
    def __init__(self, *args, **kwargs):
        super(HomeForm, self).__init__(*args, **kwargs)
        # Making location required
        self.fields['suggested_price'].required = False
        self.fields['amount_due'].required = False
    class Meta:
        model = models.Quotes
        fields = '__all__'
        