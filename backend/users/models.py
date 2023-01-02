from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Doctor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    hospital_workplace = models.CharField(max_length=100)
    medical_specialty = models.CharField(max_length=100)

    def __str__(self):
        return self.full_name

class Patient(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=100)
    place_of_birth = models.CharField(blank=True, max_length=100, default='')
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(blank=True, max_length=10, default='')
    marital_status = models.DateField(blank=True, max_length=10, default='')
    address = models.CharField(blank=True, max_length=100, default='')
    phone_number = models.CharField(blank=True, max_length=20, default='')
    occupation = models.CharField(blank=True, max_length=100, default='')

    def __str__(self):
        return self.full_name