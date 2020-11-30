# The API Key is set in .vscode/launch.json for debugging
import os, json, urllib

from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.shortcuts import render, HttpResponse, HttpResponseRedirect
from django.urls import reverse

from films.models import User

TMDB_REQ_URL = "https://api.themoviedb.org/3/"

def index(request):
    heading_title = "ShowPot!"
    api_key = os.environ.get("TMDB_API_KEY")

    # TODO for now movies only
    # Substiting this with TV works mostly! nice!
    if 'req_type' not in request.session:
        request.session["req_type"] = "movie"

    req_type = request.session["req_type"]

    context =  {
        'heading_title': heading_title,
        'api_key': api_key,
        'req_type': req_type,
        # 'data': data,
    }
    
    return render(request, "films/index.html", context)

def detail(request, req_type, req_id):
    api_key = os.environ.get("TMDB_API_KEY")
    
    req_type = request.session["req_type"]

    context = {
            'req_type': req_type,
            'req_id': req_id,
            'api_key': api_key,
    }
    
    return render(request, "films/detail.html", context)

def req_type(request, new_req_type):
    request.session["req_type"] = new_req_type
    return HttpResponseRedirect(reverse('index'))

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "films/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "films/login.html")


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "films/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "films/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "films/register.html")
