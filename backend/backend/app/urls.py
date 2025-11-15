from django.urls import path,include
from .views import RegisterView,LoginView,ServiceViewSet,TestimonialViewSet,TeamViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(f'services',ServiceViewSet,basename='service')
router.register("testimonials", TestimonialViewSet, basename="testimonial")
router.register("teamss", TeamViewSet, basename="team")

urlpatterns = [
    path('',include(router.urls)),
    path('register/',RegisterView.as_view(),name='register'),
    path('login/',LoginView.as_view(),name='login')
]
