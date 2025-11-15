from django.db import models
from django.contrib.auth.models import AbstractUser

# Auth
class UserRegister(AbstractUser):
  
    class Role(models.TextChoices):
        ADMIN = "admin", "Admin"
        CUSTOMER = "customer", "Customer"
       

   
    role = models.CharField(
        max_length=50,
        choices=Role.choices,
        default=Role.CUSTOMER  
    )
  
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='userregister_groups',
        blank=True
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='userregister_user_permissions',
        blank=True
    )

    def __str__(self):
        return self.username
    
# Service
class Service(models.Model):
    title = models.CharField(max_length=100,null=True,blank=True)
    description = models.CharField(max_length=256,null=True,blank=True)
    image = models.ImageField(null=True,blank=True)


# Testimonial
class Testimonial(models.Model):
    title = models.CharField(max_length=100, null=True, blank=True)
    description = models.CharField(max_length=256, null=True, blank=True)
    image = models.ImageField(upload_to="testimonials/", null=True, blank=True)


# Team
class Team(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    title = models.CharField(max_length=256, null=True, blank=True)
    image = models.ImageField(upload_to="team/", null=True, blank=True)


