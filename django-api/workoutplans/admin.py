from django.contrib import admin
from .models import TrainingPlan, TrainingDay, Exercise, Set

# Register your models here.

admin.site.register(TrainingPlan)
admin.site.register(TrainingDay)
admin.site.register(Exercise)
admin.site.register(Set)