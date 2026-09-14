from django.contrib import admin
from .models import Testimonial

@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    list_display = ("name", "role", "rating", "is_approved", "is_featured", "created_at")
    list_filter = ("is_approved", "is_featured", "role", "rating")
    search_fields = ("name", "role", "message")
    list_editable = ("is_approved", "is_featured")