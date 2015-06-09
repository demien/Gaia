from django import http
from django.http import HttpResponse
from django.views.generic import View
from services.mongo_service import APIService
from django.shortcuts import render_to_response


class BaseView(View):

    def get(self, *args, **kwargs):
        return render_to_response('test.html')
