from django.db import models

# Create your models here.

class Quotes(models.Model):
    gallons_requested = models.IntegerField()
    delivery_address = models.CharField(max_length=30)
    delivery_date = models.DateField()
    suggested_price = models.IntegerField(null=True,blank=True)
    amount_due = models.IntegerField(null=True, blank=True )