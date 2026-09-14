from rest_framework import serializers
from .models import Testimonial

class TestimonialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Testimonial
        fields = [
            "id",
            "name",
            "role",
            "message",
            "photo",
            "rating",
            "is_featured",
            "created_at",
        ]