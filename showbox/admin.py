from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Favorite, WatchList


# Custom User Admin Form
# See https://stackoverflow.com/questions/48011275/custom-user-model-fields-abstractuser-not-showing-in-django-admin/48013640
class CustomUserAdmin(UserAdmin):
    fieldsets = (
        *UserAdmin.fieldsets,  # original form fieldsets, expanded
        (                      # new fieldset added on to the bottom
            'Custom Field Heading',  # group heading of your choice; set to None for a blank space instead of a header
            {
                'fields': (
                    'api_key',
                    'profile_img',
                ),
            },
        ),
    )


# Register your models here.
admin.site.register(User, CustomUserAdmin)
admin.site.register(Favorite)
admin.site.register(WatchList)
