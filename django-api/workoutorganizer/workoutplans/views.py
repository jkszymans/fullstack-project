from django.shortcuts import render
from rest_framework import generics
from .models import TrainingPlan, Exercise
from .serializers import TrainingPlanSerializer
from rest_framework import viewsets


class TrainingPlanViewSet(viewsets.ModelViewSet):
    queryset = TrainingPlan.objects.all()
    serializer_class = TrainingPlanSerializer