# The API Key is set in .vscode/launch.json for debugging
import os, json, urllib

from django.shortcuts import render, HttpResponse, HttpResponseRedirect

def index(request):
    greeting = "Commence Capstone: Films"
    api_key = os.environ.get("TMDB_API_KEY")

    # url = f"https://api.themoviedb.org/3/discover/movie?api_key={api_key}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1"
    # response = urllib.request.urlopen(url) 
    # data = json.loads(response.read())

    context =  {
        'greeting': greeting,
        'api_key': api_key,
        # 'data': data,
    }
    
    return render(request, "films/index.html", context)