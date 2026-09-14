from django.db import models

class Teacher(models.Model):
    name = models.CharField(max_length=150)
    designation = models.CharField(max_length=100)
    subject = models.CharField(max_length=100, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    photo = models.ImageField(upload_to="teachers/", blank=True, null=True)
    experience_years = models.PositiveIntegerField(blank=True, null=True)
    is_active = models.BooleanField(default=True)
    display_order = models.IntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["display_order", "name"]

    def __str__(self):
        return f"{self.name} - {self.designation}"