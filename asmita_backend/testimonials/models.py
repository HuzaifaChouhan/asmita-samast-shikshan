from django.db import models

class Testimonial(models.Model):
    name = models.CharField(max_length=150)
    role = models.CharField(max_length=100, help_text="e.g. Parent, Student, Alumni")
    message = models.TextField()
    photo = models.ImageField(upload_to="testimonials/", blank=True, null=True)
    rating = models.PositiveIntegerField(blank=True, null=True, choices=[(i, i) for i in range(1, 6)])
    is_approved = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"{self.name} ({self.role})"