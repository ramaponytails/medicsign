from django.db import models
from django.contrib.auth.models import User
from users.models import Doctor, Patient
from datetime import datetime

# Create your models here.

def empty_dict():
    return {}

class MedicalReport(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    created_at = models.DateTimeField(default=datetime.now)
    hospital_entry_date = models.DateField(blank=True, null=True)
    hospital_release_date = models.DateField(blank=True, null=True)
    medical_history = models.TextField(blank=True, default='')
    medical_condition = models.TextField(blank=True, default='')
    surgery_processes = models.TextField(blank=True, default='')
    medication = models.TextField(blank=True, default='')
    # Attachment TODO

class UserMedicalReport(models.Model):
    # Identification details TODO
    created_at = models.DateTimeField(default=datetime.now)
    hospital_entry_date = models.DateField(blank=True, null=True)
    hospital_release_date = models.DateField(blank=True, null=True)
    medical_history = models.TextField(blank=True, default='')
    medical_condition = models.TextField(blank=True, default='')
    surgery_processes = models.TextField(blank=True, default='')
    medication = models.TextField(blank=True, default='')
    # Attachment TODO