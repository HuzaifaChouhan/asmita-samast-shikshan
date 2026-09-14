from django.contrib import admin
from .models import Teacher

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ("name", "designation", "subject", "is_active", "display_order")
    list_filter = ("is_active", "subject")
    search_fields = ("name", "designation", "subject", "bio")
    list_editable = ("is_active", "display_order")