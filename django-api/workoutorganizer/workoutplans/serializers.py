from rest_framework import serializers
from .models import TrainingPlan, TrainingDay, Exercise, Set


class SetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Set
        fields = ("repetitions",)


class ExerciseSerializer(serializers.ModelSerializer):
    sets = SetSerializer(many=True)

    class Meta:
        model = Exercise
        fields = ("exercise_name", "rpe", "sets")


class TrainingSerializer(serializers.ModelSerializer):
    exercises = ExerciseSerializer(many=True)

    class Meta:
        model = TrainingDay
        fields = ("date", "time", "exercises")


class TrainingPlanSerializer(serializers.ModelSerializer):
    training_days = TrainingSerializer(many=True)

    class Meta:
        model = TrainingPlan
        fields = ("user", "start_date", "description", "training_days")
