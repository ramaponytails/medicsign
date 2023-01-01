from django.shortcuts import render
from django.http import HttpResponse, HttpResponseNotFound

# Create your views here.

def error(request):
    return HttpResponse(status=404)