from django.shortcuts import render, HttpResponse, HttpResponseRedirect

# Create your views here.

def index(request):
    return HttpResponse("Commence Capstone: Films.... Start!!!")