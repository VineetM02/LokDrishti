from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class User(AbstractUser):
    # Adds your custom fields on top of Django's default ones
    member_since = models.DateTimeField(auto_now_add=True)  # auto set when user is created
    total_contributions = models.IntegerField(default=0)    # track user activity
    
    def __str__(self):
        return self.username