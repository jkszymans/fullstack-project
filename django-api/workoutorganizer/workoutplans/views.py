from django.shortcuts import render
from rest_framework import generics
from .models import TrainingPlan, Exercise
from .serializers import TrainingPlanSerializer


class TrainingListView(generics.ListAPIView):
    queryset = TrainingPlan.objects.all()
    serializer_class = TrainingPlanSerializer
