from rest_framework import serializers
from .models import Teacher

class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = [
            "id",
            "name",
            "designation",
            "subject",
            "bio",
            "photo",
            "experience_years",
            "display_order",
        ]