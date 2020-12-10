# The API Key is set in .vscode/launch.json for debugging
import os, json, urllib

from django.contrib.auth import authenticate, login, logout
from django.db import IntegrityError
from django.shortcuts import render, HttpResponse, HttpResponseRedirect
from django.http import JsonResponse
from django.urls import reverse

from films.models import User, Favorite, WatchList
from films.forms import MyAccountForm

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
    myuser = request.user

    favorite = Favorite.objects.filter(
                                owner=myuser,
                                media_type=req_type,
                                media_id=req_id
                                ).first()

    watchlist = WatchList.objects.filter(
                                owner=myuser,
                                media_type=req_type,
                                media_id=req_id
                                ).first()
    is_favorite = (True if favorite else False)
    is_watchlist = (True if watchlist else False)

    context = {
            'req_type': req_type,
            'req_id': req_id,
            'api_key': api_key,
            'is_favorite': is_favorite,
            'is_watchlist': is_watchlist,
    }
    
    return render(request, "films/detail.html", context)

def credits(request, req_type, req_id):
    api_key = os.environ.get("TMDB_API_KEY")
    context = {
            'req_type': req_type,
            'req_id': req_id,
            'api_key': api_key,
    }
    return render(request, "films/credits.html", context)


def discover(request, req_type):
    api_key = os.environ.get("TMDB_API_KEY")
    context = {
            'req_type': req_type,
            'api_key': api_key,
    }
    return render(request, "films/discover.html", context)

def search(request):
    if request.method == "POST":
        query_str = request.POST['query_str']
        api_key = os.environ.get("TMDB_API_KEY")
        context = {
                'api_key': api_key,
                'query_str': query_str,
        }
        return render(request, "films/search.html", context)

    return HttpResponseRedirect(reverse('index'))

def req_type(request, new_req_type):
    request.session["req_type"] = new_req_type
    return HttpResponseRedirect(reverse('index'))

def toggle_favorite_item(request, req_type, req_id):
    if request.method == "PUT":
        # Check if the fave already exists
        myuser = request.user
        fave = Favorite.objects.filter(
                                owner = myuser,
                                media_type = req_type,
                                media_id = req_id,
                                ).first()
        if not fave:
            new_fave = Favorite.objects.create(
                owner = myuser,
                media_type = req_type,
                media_id = req_id
            )
            new_fave.save()

            status_str = "Added to Favorites"

            return JsonResponse({
                            "status": status_str,
                            "media_type": req_type,
                            "media_id": req_id,
                            "do": "add"
            }, status=200)

        else:
            fave.delete()
            status_str = "Removed from Favorites"

            return JsonResponse({
                            "status": status_str,
                            "media_type": req_type,
                            "media_id": req_id,
                            "do": "remove"
            }, status=200)
    return HttpResponse("Error")

def toggle_watchlist_item(request, req_type, req_id):
    if request.method == "PUT":
        myuser = request.user
        # Check if the fave already exists
        watchme = WatchList.objects.filter(
                                owner = myuser,
                                media_id = req_id,
                                media_type = req_type
                                ).first()
        print(watchme)
        if not watchme:
            new_watchme = WatchList.objects.create(
                owner = myuser,
                media_type = req_type,
                media_id = req_id
            )
            new_watchme.save()

            status_str = "Added to Watch List"

            return JsonResponse({
                            "status": status_str,
                            "media_type": req_type,
                            "media_id": req_id,
                            "do": "add",
            }, status=200)

        else:
            watchme.delete()
            status_str = "Removed from WatchList"

            return JsonResponse({
                            "status": status_str,
                            "media_type": req_type,
                            "media_id": req_id,
                            "do": "remove",
            }, status=200)
    return HttpResponse("Error")


##########################################################################
#                            AUTHENTICATION                              #
##########################################################################
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
                "message_error": "Invalid username and/or password.",
                "req_type": request.session["req_type"],
            })
    else:
        return render(request, "films/login.html", { 'req_type': request.session["req_type"] })


def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))


def register(request):
    if request.method == "POST":
        username = request.POST["username"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "films/register.html", {
                "message_error": "Passwords must match.",
                "req_type": request.session["req_type"],
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username=username,
                                            password=password)
            user.save()
        except IntegrityError:
            return render(request, "films/register.html", {
                "message_error": "Username already taken.",
                "req_type": request.session["req_type"],
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "films/register.html", { 'req_type': request.session["req_type"] })

def my_account(request):
    if request.method == "POST":
        form = MyAccountForm(request.POST, instance=request.user)
        print(form)
        if form.is_valid():
            form.save()
            context = {
                'message_success': 'Changes Saved!'
            }
            print('valid form')
            return HttpResponseRedirect(reverse("my_account"))
        else:
            context = {
                'message_error': 'Error: Invalid Changes'
            }
            print('not valid form')
            return HttpResponseRedirect(reverse("my_account"))

    myuser = request.user
    form = MyAccountForm(instance=myuser)

    context = {
        'myuser': myuser,
        'form': form
    }

    return render(request, "films/my_account.html", context)

