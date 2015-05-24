from django import forms


class ScrapeDataForm(forms.Form):
    version = forms.IntegerField(required=True)
