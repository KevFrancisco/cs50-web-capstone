# The API Key is set in .vscode/launch.json for debugging
import os, json, urllib

from django.shortcuts import render, HttpResponse, HttpResponseRedirect

TMDB_REQ_URL = "https://api.themoviedb.org/3/"

def index(request):
    heading_title = "ShowPot!"
    api_key = os.environ.get("TMDB_API_KEY")
    # TODO for now movies only
    # Substiting this with TV works mostly! nice!
    req_type = "tv"

    context =  {
        'heading_title': heading_title,
        'api_key': api_key,
        'req_type': req_type,
        # 'data': data,
    }
    
    return render(request, "films/index.html", context)

def detail(request, req_type, req_id):
    api_key = os.environ.get("TMDB_API_KEY")

    context = {
            'req_type': req_type,
            'req_id': req_id,
            'api_key': api_key,
    }
    
    return render(request, "films/detail.html", context)
