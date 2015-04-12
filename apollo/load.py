import urllib2
from . import form
from django import http
from django.http import HttpResponse
from django.views.generic import View


class LoadCBV(View):
    form_class = form.LoadForm

    def get_form(self, request, *args, **kwargs):
        for k, v in request.GET.iteritems():
            kwargs[k] = v
        form = self.form_class(kwargs)
        if not form.is_valid():
            return http.Http404()
        return form

    def get(self, request, *args, **kwargs):
        form = self.get_form(request, *args, **kwargs)
        url = form.cleaned_data['url']
        content = urllib2.urlopen('http://localhost:8585?url=' + url).read()
        return HttpResponse(content)
