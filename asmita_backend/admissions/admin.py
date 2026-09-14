from django.contrib import admin
from .models import Inquiry

@admin.register(Inquiry)
class InquiryAdmin(admin.ModelAdmin):
    list_display = ("full_name", "email", "phone", "class_applying_for", "status", "created_at")
    list_filter = ("status", "class_applying_for", "created_at")
    search_fields = ("full_name", "email", "phone", "student_name", "message")
    list_editable = ("status",)
    readonly_fields = ("created_at",)