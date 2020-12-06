from django.forms import ModelForm
from films.models import User

class MyAccountForm(ModelForm):
    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'api_key', 'profile_img', 'locale']
