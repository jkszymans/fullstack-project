from django.urls import path

from . import views

from rest_framework.routers import DefaultRouter

app_name = "workoutplans"
router = DefaultRouter()
router.register(r"", views.TrainingPlanViewSet, basename="training-plans")
urlpatterns = router.urls


# urlpatterns = [
#     path("", views.TrainingPlanListView.as_view(), name="training-list"),
#     path("/create", views.TrainingPlanCreateView.as_view(), name="training-create"),
# ]