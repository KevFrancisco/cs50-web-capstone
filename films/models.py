from django.db import models
from django.contrib.auth.models import AbstractUser

TMDB_LOCALES = [
    ('US', 'United States'),
]
MEDIA_TYPES = [
    ('tv', 'TV'),
    ('movie', 'MOVIE'),
]
# Create your models here.
class User(AbstractUser):
    api_key = models.CharField(
                        max_length=50
                        )
    profile_img = models.CharField(
                        max_length=50,
                        blank=True,
                        )
    locale = models.CharField(
                        max_length=2,
                        default='US',
                        choices=TMDB_LOCALES,
                        )

class Favorite(models.Model):
    owner = models.ForeignKey(
                        User,
                        related_name='favorites',
                        on_delete=models.CASCADE,
                        ) 
    media_type = models.CharField(
                        max_length = 5,
                        default = 'movie',
                        choices = MEDIA_TYPES,
                        )
    media_id = models.CharField(
                        max_length = 30,
                        )

