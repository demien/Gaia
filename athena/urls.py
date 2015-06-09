from athena.base_view import BaseView 
from django.conf.urls import patterns, include, url


urlpatterns = patterns('',
    url(r'^test/', BaseView.as_view(), name='test'),
)
