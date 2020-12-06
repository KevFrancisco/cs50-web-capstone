from django.db import models
from django.contrib.auth.models import AbstractUser

TMDB_LOCALES = [
    ('US', 'United States'),
]

# Create your models here.
class User(AbstractUser):
    api_key = models.CharField(max_length=50)
    profile_img = models.ImageField(
                        upload_to='films/',
                        blank=True,
                        )
    locale = models.CharField(
                        max_length=2,
                        default='US',
                        choices=TMDB_LOCALES,
                        )

