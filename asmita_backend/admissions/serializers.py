from rest_framework import serializers
from .models import Inquiry

class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = [
            "id",
            "full_name",
            "email",
            "phone",
            "student_name",
            "class_applying_for",
            "message",
            "created_at",
        ]
        read_only_fields = ["id", "created_at"]