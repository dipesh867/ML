from django.shortcuts import render,redirect
from myapp.models import Admission,Contact,Event,EventImage
from django.contrib.auth import login ,logout ,authenticate
from django.contrib.auth.decorators import login_required


def Contact_API(request):
    # if request.method=='POST':
    #     data=request.POST
    #     name=data.name
    #     message=data.message
    #     phone=data.phone
    #     email=data.email
    #     subject=data.subject
    
    # Contact.objects.create(name=name,message=message,phone=phone,email=email,subject=subject)

    return render(request,'myapp/index.html')

        