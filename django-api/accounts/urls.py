from django.contrib import admin
from django.urls import path, include
from rest_framework_jwt.views import obtain_jwt_token
from .views import CreateUserView, get_current_user

app_name = "accounts"

urlpatterns = [
    path("token-auth/", obtain_jwt_token),
    path("current_user/", get_current_user),
    path("create/", CreateUserView.as_view()),
]