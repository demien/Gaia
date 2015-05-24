import urllib2
import json
from . import form
from django import http
from django.http import HttpResponse
from django.views.generic import View
from services.mongo_service import APIService


class APIBaseView(View):
    form_class = None

    def get_form(self, request, *args, **kwargs):
        for k, v in request.GET.iteritems():
            kwargs[k] = v
        form = self.form_class(kwargs)
        if not form.is_valid():
            return http.Http404()
        return form


class ApiScrapeData(APIBaseView):
    form_class = form.ScrapeDataForm

    def get(self, request, api_id, *args, **kwargs):
        form = self.get_form(request, *args, **kwargs)
        version = form.cleaned_data['version']
        content = APIService().get_scrape_data(api_id, version)
        return HttpResponse(json.dumps(content))
