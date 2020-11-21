from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("detail/<str:req_type>/<int:req_id>", views.detail, name="detail"),
]
