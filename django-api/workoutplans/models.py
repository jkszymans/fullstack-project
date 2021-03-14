from django.db import models
from django.contrib.auth.models import User


# WEEKDAYS = (
#     ("Monday", "Monday"),
#     ("Tuesday", "Tuesday"),
#     ("Wednesday", "Wednesday"),
#     ("Thursday", "Thursday"),
#     ("Friday", "Friday"),
#     ("Saturday", "Saturday"),
#     ("Sunday", "Sunday"),
# )


class TrainingPlan(models.Model):
    user = models.ForeignKey(
        User,
        related_name="training_plans",
        on_delete=models.CASCADE,
    )
    plan_name = models.CharField(max_length=30)
    # start_date = models.DateField()
    description = models.TextField(blank=True, null=True)

    def __str__(self):
        return f"{self.user}:{self.plan_name}"


class TrainingDay(models.Model):
    training_plan = models.ForeignKey(
        TrainingPlan, related_name="training_days", on_delete=models.CASCADE
    )
    date = models.DateField()
    time = models.TimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.training_plan}:{self.date}"


class Exercise(models.Model):
    training_day = models.ForeignKey(
        TrainingDay, related_name="exercises", on_delete=models.CASCADE
    )
    exercise_name = models.CharField(max_length=30)
    rpe = models.PositiveSmallIntegerField()

    def __str__(self):
        return f"{self.training_day}:{self.exercise_name}"


class Set(models.Model):
    exercise = models.ForeignKey(
        Exercise, related_name="sets", on_delete=models.CASCADE
    )
    repetitions = models.PositiveSmallIntegerField()

    def __str__(self):
        return f"{self.exercise}:{self.repetitions}"