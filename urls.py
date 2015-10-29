from apollo.load import LoadCBV
from apollo.index import HelloworldCBV, VerifyWechatCBV, EchoCallbackCBV
from apollo.test import InviteCBV
from django.conf import settings
from django.conf.urls import patterns, include, url
from django.contrib import admin



admin.autodiscover()


urlpatterns = patterns('',
    url(r'^$', EchoCallbackCBV.as_view(), name='home_page'),
    url(r'^helloworld/', HelloworldCBV.as_view(), name='helloworld'),
    url(r'^invite/', InviteCBV.as_view(), name='invite'),
    url(r'^load/', LoadCBV.as_view(), name='apollo_loader'),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^css/(?P<path>.*)$','django.views.static.serve', {'document_root':settings.STATICFILES_CSS_DIRS, 'show_indexes': True}),
    url(r'^js/(?P<path>.*)$','django.views.static.serve', {'document_root':settings.STATICFILES_JS_DIRS, 'show_indexes': True}),
    (r'^', include('api.urls')),
)
