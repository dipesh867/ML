from django.urls import path
from myapp.views import Contact_API

urlpatterns=[
    path('',Contact_API,name='contact')
]