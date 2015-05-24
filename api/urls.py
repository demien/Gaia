from api.views import ApiScrapeData
from django.conf.urls import patterns, include, url


urlpatterns = patterns('',
    url(r'^(?P<api_id>[0-9a-z\-\+_!.]+)/data', ApiScrapeData.as_view(), name='scrape_data'),
)
