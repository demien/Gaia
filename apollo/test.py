from django import http
from django.http import HttpResponse
from django.views.generic import View
from django.template import loader
from django.shortcuts import render_to_response


class InviteCBV(View):

    def get(self, request, *args, **kwargs):
        template_name = 'test/invite.html'
        return render_to_response(template_name, {})
