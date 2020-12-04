from django.urls import path

from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("detail/<str:req_type>/<int:req_id>", views.detail, name="detail"),
    path("credits/<str:req_type>/<int:req_id>", views.credits, name="credits"),
    path("discover/<str:req_type>", views.discover, name="discover"),
    path("request/<str:new_req_type>", views.req_type, name="req_type"),
]
