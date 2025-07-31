from rest_framework import routers
from django.urls import path, include
from .views import PostViewSet, user_login, user_logout, user_register

router = routers.DefaultRouter()
router.register(r'posts', PostViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login/', user_login, name='user_login'),
    path('auth/logout/', user_logout, name='user_logout'),
    path('auth/register/', user_register, name='user_register'),
]