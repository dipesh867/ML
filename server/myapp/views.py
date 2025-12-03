from urllib import request
from django.shortcuts import render,redirect
from django.contrib.auth import authenticate, login,logout
from django.contrib import messages
from myapp.models import Contact,Admission,EventImage,Event



def admin_logout(request):
    logout(request)
    request.session.flush()  # clear all session data
    return redirect('home')



def admin_login_view(request):
    if request.method == "POST":
        username = request.POST.get("username")
        password = request.POST.get("password")

        user = authenticate(request, username=username, password=password)

        if user is None or not user.is_superuser:
            messages.error(request, "Wrong username or not a superuser")
            return render(request, "myapp/index.html", {"open_modal": True})

        # Log the user in
        login(request, user)

        request.session['admin_authenticated'] = True

        return redirect("admin")  # go to dashboard

    # If GET request, go to home
    return render(request,"myapp/admin_login.html")


def Admin_API(request):
    # Must have logged-in session from modal
    if not request.session.get('admin_authenticated', False):
        # Log out any previous login
        logout(request)
        # Redirect to home which shows the modal
        return redirect('admin_login')  

    # Optional: extra superuser check
    if not request.user.is_superuser:
        logout(request)
        return redirect('admin_login')

    # Normal dashboard
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
    return render(request,'myapp/gallery.html')

def programs_API(request):
    return render(request,'myapp/programs.html')


