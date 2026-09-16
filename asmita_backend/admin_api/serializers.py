from rest_framework import serializers
from admissions.models import Inquiry
from teachers.models import Teacher
from testimonials.models import Testimonial


class InquiryAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = [
            "id", "full_name", "email", "phone",
            "student_name", "class_applying_for",
            "message", "status", "created_at",
        ]
        read_only_fields = ["id", "created_at"]


class TeacherAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = [
            "id", "name", "designation", "subject", "bio",
            "photo", "experience_years", "is_active",
            "display_order", "created_at", "updated_at",
        ]
        read_only_fields = ["id", "created_at", "updated_at"]


class TestimonialAdminSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            "id", "name", "role", "message", "photo",
            "rating", "is_approved", "is_featured", "created_at",
        ]
        read_only_fields = ["id", "created_at"]
