from django import forms


class LoadForm(forms.Form):
    url = forms.CharField(required=True)
