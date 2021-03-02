from rest_framework import serializers
from .models import TrainingPlan, TrainingDay, Exercise, Set


class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = "__all__"


class ExerciseSerializer(serializers.ModelSerializer):
    sets = SetSerializer(many=True, read_only=True)

    class Meta:
        model = Exercise
        fields = "__all__"


class TrainingSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True, read_only=True)

    class Meta:
        model = TrainingDay
        fields = "__all__"


class TrainingPlanSerializer(serializers.ModelSerializer):
    training_days = TrainingSerializer(many=True, read_only=True)

    class Meta:
        model = TrainingPlan
        fields = "__all__"
