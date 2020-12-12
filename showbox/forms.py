from django.forms import ModelForm
from showbox.models import User

class MyAccountForm(ModelForm):
    class Meta:
        model = User
        fields = ['username', 'password', 'first_name', 'last_name', 'profile_img', 'locale']
