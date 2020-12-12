from django.urls import path

from showbox import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.register, name="register"),
    path("my_account", views.my_account, name="my_account"),
    path("user/<str:user_item_type>", views.user_items, name="user_items"),
    path("user/list/<str:user_item_type>", views.list_user_items, name="list_user_items"),
    path("search", views.search, name="search"),
    path("detail/<str:req_type>/<int:req_id>", views.detail, name="detail"),
    path("toggle/favorite/<str:req_type>/<int:req_id>", views.toggle_favorite_item, name="toggle_favorite_item"),
    path("toggle/watchlist/<str:req_type>/<int:req_id>", views.toggle_watchlist_item, name="toggle_watchlist_item"),
    path("credits/<str:req_type>/<int:req_id>", views.credits, name="credits"),
    path("discover/<str:req_type>", views.discover, name="discover"),
    path("request/<str:new_req_type>", views.req_type, name="req_type"),
]
