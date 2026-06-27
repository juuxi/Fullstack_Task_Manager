from django.db import models


class Task(models.Model):
    title = models.CharField(max_length=100)
    completed = models.CharField(max_length=11, default='pending')
    created_at = models.DateField(auto_now_add=True)
