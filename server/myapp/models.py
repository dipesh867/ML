from django.db import models
from django.db.models.signals import post_delete
from django.dispatch import receiver
import os


# Model for the Contact
class Contact(models.Model):
    name=models.CharField(max_length=100,null=True)
    message=models.CharField(max_length=100,null=True)
    phone=models.CharField(max_length=100,null=True)
    email=models.EmailField(null=True)
    subject=models.CharField(max_length=100,null=True)

    def __str__(self):
        return self.name
    

# Model forthe admmission process
class Admission(models.Model):
    name=models.CharField(max_length=100)
    parent_name=models.CharField(max_length=100)
    phone=models.CharField(max_length=100)
    grade=models.IntegerField(null=True)



# Model for class which supports multiple images 
class Event(models.Model):
    event_name = models.CharField(max_length=255)

    def __str__(self):
        return self.event_name

# Multiple image for the given event
class EventImage(models.Model):
    event = models.ForeignKey(Event, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to='event_images/')

    def __str__(self):
        return f"{self.event.event_name} Image"


# ---------------- DELETE IMAGE FILE WHEN EventImage IS DELETED ---------------- #
@receiver(post_delete, sender=EventImage)
def delete_image_file(sender, instance, **kwargs):
    if instance.image:
        if os.path.isfile(instance.image.path):
            os.remove(instance.image.path)


# ---------------- DELETE ALL IMAGES WHEN Event IS DELETED ---------------- #
@receiver(post_delete, sender=Event)
def delete_event_images(sender, instance, **kwargs):
    for img in instance.images.all():
        if os.path.isfile(img.image.path):
            os.remove(img.image.path)
