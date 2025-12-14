from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class User(AbstractUser):
    # Adds your custom fields on top of Django's default ones
    member_since = models.DateTimeField(auto_now_add=True)  # auto set when user is created
    total_contributions = models.IntegerField(default=0)    # track user activity
    
    def __str__(self):
        return self.username

class Bills(models.Model):
    STATUS_CHOICES = [
        ("open", "Open"),
        ("closed", "Closed"),
        ("pending", "Pending"),
    ]
    #id=models.IntegerField(unique=True) Django automatically creates this
    title=models.CharField(max_length=255)
    description=models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    slug = models.SlugField(unique=True) # future proofing rather than using id for fetching useing url name 
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title

class Comment(models.Model):
    bill = models.ForeignKey('bills', on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    sentiment = models.CharField(
        max_length=20,
        choices=[
            ("positive", "Positive"),
            ("neutral", "Neutral"),
            ("negative", "Negative"),
        ],
        null=True, blank=True
    )
    is_flagged = models.BooleanField(default=False)  # If model flags toxic content
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username} - {self.bill.title}"
