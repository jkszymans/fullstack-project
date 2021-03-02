from django.urls import path

from . import views

app_name = "workoutplans"
urlpatterns = [
    path("", views.TrainingListView.as_view(), name="training-list"),
]