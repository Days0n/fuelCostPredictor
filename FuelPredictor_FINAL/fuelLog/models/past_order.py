from django.contrib.auth import get_user_model
from django.db import models


class PastOrder(models.Model):

    user = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE
    )

    gallons = models.FloatField()

    delivery_addr = models.CharField(max_length=100)

    delivery_date = models.DateField()

    unit_price = models.FloatField()

    total_price = models.FloatField()
