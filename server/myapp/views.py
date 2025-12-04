from urllib import request
from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, login,logout
from django.contrib import messages
from myapp.models import Contact,Admission,EventImage,Event
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required



def admin_logout(request):
    logout(request)
    return redirect('home')




def admin_login_view(request):
    if request.method=="POST":
        username=request.POST.get("username")
        password=request.POST.get("password")
    
        user=authenticate(username=username,password=password)
        if user==None:
            messages.error(request,"Invalid credentials")
            return redirect('admin_login') 
        else:
            login(request,user)
            return redirect('admin')
    return render(request,"myapp/admin_login.html")




@login_required(login_url="admin_login")
def Admin_API(request):
    contact = Contact.objects.all()
    admission = Admission.objects.all()
    return render(request, 'myapp/admin.html', {'contact': contact, 'admission': admission})


def Delete_Contact(request,id):
    contact=Contact.objects.get(id=id)
    contact.delete()
    return redirect('admin')

def Delete_Admission(request,id):
    admission=Admission.objects.get(id=id)
    admission.delete()
    return redirect('admin')
    
def Index_API(request):
    return render(request,'myapp/index.html')

def About_API(request):
    return render(request,'myapp/about.html')

def Admission_API(request):
    if request.method == "POST":
        name = request.POST.get('name')
        phone = request.POST.get('phone')
        grade = request.POST.get('grade')
        parent_name = request.POST.get('parent_name')


        Admission.objects.create(
            name=name,
            grade=grade,
            phone=phone,
            parent_name=parent_name
        )

   
        return redirect('home')

    return render(request,'myapp/admissions.html')

from django.contrib import messages

def Contact_API(request):
    if request.method == "POST":
        name = request.POST.get('name')
        email = request.POST.get('email')
        phone = request.POST.get('phone')
        subject = request.POST.get('subject')
        message = request.POST.get('message')

        if not subject:
            messages.error(request, "Please select a subject")
            return render(request, 'myapp/contact.html', {'submitted_subject': subject})

        Contact.objects.create(
            name=name,
            email=email,
            phone=phone,
            subject=subject,
            message=message
        )


        return redirect('home')

    return render(request, 'myapp/contact.html')



def Gallery_API(request):
    events = Event.objects.all()
    return render(request, "myapp/gallery.html", {"events": events})

def programs_API(request):
    return render(request,'myapp/programs.html')



def upload_event(request):
    if request.method == "POST":
        event_name = request.POST.get("event_name")
        images = request.FILES.getlist("images")  # <-- MULTIPLE FILES

        # Create event
        event = Event.objects.create(event_name=event_name)

        # Save each image under the same event
        for img in images:
            EventImage.objects.create(event=event, image=img)

        return redirect("admin")

    return render(request, "myapp/admin.html")



