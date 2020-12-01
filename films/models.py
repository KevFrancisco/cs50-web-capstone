from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    pass

class UserProfile(models.Model):
    api_key = models.CharField(max_length=50)
    profile_img = models.ImageField()
    user = models.OneToOneField(
                        User,
                        on_delete=models.CASCADE,
                        )
    def __str__(self):
        return f"Profile Image and API_KEY for {self.user}" 
