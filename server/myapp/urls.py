from django.urls import path
from django.contrib.auth import views as auth_views
from myapp.views import (
    Index_API, Admission_API, Contact_API, About_API, 
    programs_API, Gallery_API,admin_login_view,Admin_API,Delete_Admission,Delete_Contact,admin_logout,upload_event
)

urlpatterns = [
    path('', Index_API, name='home'),
    path('admission/', Admission_API, name='admission'),
    path('contact/', Contact_API, name='contact'),
    path('about/', About_API, name='about'),
    path('program/', programs_API, name='program'),
    path('gallery/', Gallery_API, name='gallery'),
    path('admin_login/', admin_login_view, name='admin_login'),
    path('admin/', Admin_API, name='admin'),
    path('delete_contact/<int:id>/', Delete_Contact, name='delete_contact'),
    path('delete_admission/<int:id>/', Delete_Admission, name='delete_admission'),
    path('admin_logout/', admin_logout, name='admin_logout'),
    path('upload_event/', upload_event, name='upload_event')
]

