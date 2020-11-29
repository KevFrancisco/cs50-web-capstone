from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("detail/<str:req_type>/<int:req_id>", views.detail, name="detail"),
    path("request/<str:new_req_type>", views.req_type, name="req_type"),
]
