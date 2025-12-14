from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User,Bills,Comment

# Register your models here.
admin.site.register(User)
admin.site.register(Bills)
admin.site.register(Comment)