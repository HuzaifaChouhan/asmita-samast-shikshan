from rest_framework import generics
from rest_framework.throttling import AnonRateThrottle
from .models import Inquiry
from .serializers import InquirySerializer

class InquiryThrottle(AnonRateThrottle):
    rate = "5/minute"  # Custom rate limit to prevent form spam

class InquiryCreateView(generics.CreateAPIView):
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    throttle_classes = [InquiryThrottle]