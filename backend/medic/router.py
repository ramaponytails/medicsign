from .models import MedicalReport, UserMedicalReport
from django.contrib.auth.models import User

class MedicalRouter:
    # Router for Medical Reports

    hospital_report = 'MedicalReport'
    user_report = 'UserMedicalReport'

    def db_for_read(self, model, **hints):
        if model._meta.app_label != 'medic':
            return None
        if model._meta.object_name == self.hospital_report:
            return 'default'
        elif model._meta.object_name == self.user_report:
            return 'userside'
        return None

    def db_for_write(self, model, **hints):
        if model._meta.app_label != 'medic':
            return None
        if model._meta.object_name == self.hospital_report:
            return 'default'
        elif model._meta.object_name == self.user_report:
            return 'userside'
        return None
    
    def allow_relation(self, obj1, obj2, **hints):
        if obj1._meta.app_label != 'medic' or obj2._meta.app_label != 'medic':
            return None
        if obj1._meta.object_name not in [self.hospital_report, self.user_report]:
            return None
        if obj2._meta.object_name not in [self.hospital_report, self.user_report]:
            return None
        if obj1._meta.object_name == obj2._meta.object_name:
            return True
        return None

    def allow_migrate(self, db, app_label, model_name=None, **hints):
        if app_label != 'medic':
            return None
        if model_name == self.hospital_report:
            return db == 'default'
        elif model_name == self.user_report:
            return 'userside'
        return None