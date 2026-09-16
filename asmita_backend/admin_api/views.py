from django.contrib.auth import authenticate
from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.authtoken.models import Token
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser

from admissions.models import Inquiry
from teachers.models import Teacher
from testimonials.models import Testimonial

from .serializers import (
    InquiryAdminSerializer,
    TeacherAdminSerializer,
    TestimonialAdminSerializer,
)


# ── Authentication ─────────────────────────────────────────────────────────────

class LoginView(APIView):
    """Admin login — returns an auth token."""
    def post(self, request):
        username = request.data.get("username")
        password = request.data.get("password")
        user = authenticate(username=username, password=password)
        if user is None:
            return Response({"error": "Invalid credentials."}, status=status.HTTP_401_UNAUTHORIZED)
        if not user.is_staff:
            return Response({"error": "Admin access required."}, status=status.HTTP_403_FORBIDDEN)
        token, _ = Token.objects.get_or_create(user=user)
        return Response({
            "token": token.key,
            "username": user.username,
            "email": user.email,
        })


class LogoutView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        request.user.auth_token.delete()
        return Response({"detail": "Logged out."})


class MeView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        return Response({
            "username": request.user.username,
            "email": request.user.email,
        })


# ── Dashboard Stats ─────────────────────────────────────────────────────────────

class StatsView(APIView):
    permission_classes = [IsAuthenticated, IsAdminUser]

    def get(self, request):
        return Response({
            "total_inquiries": Inquiry.objects.count(),
            "new_inquiries": Inquiry.objects.filter(status="new").count(),
            "total_teachers": Teacher.objects.count(),
            "active_teachers": Teacher.objects.filter(is_active=True).count(),
            "total_testimonials": Testimonial.objects.count(),
            "pending_testimonials": Testimonial.objects.filter(is_approved=False).count(),
        })


# ── Inquiries ───────────────────────────────────────────────────────────────────

class InquiryListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = InquiryAdminSerializer

    def get_queryset(self):
        qs = Inquiry.objects.all()
        status_filter = self.request.query_params.get("status")
        search = self.request.query_params.get("search")
        if status_filter:
            qs = qs.filter(status=status_filter)
        if search:
            qs = qs.filter(full_name__icontains=search) | qs.filter(email__icontains=search) | qs.filter(phone__icontains=search)
        return qs


class InquiryDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = InquiryAdminSerializer
    queryset = Inquiry.objects.all()


# ── Teachers ────────────────────────────────────────────────────────────────────

class TeacherListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = TeacherAdminSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_queryset(self):
        qs = Teacher.objects.all()
        search = self.request.query_params.get("search")
        if search:
            qs = qs.filter(name__icontains=search) | qs.filter(subject__icontains=search)
        return qs


class TeacherDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = TeacherAdminSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    queryset = Teacher.objects.all()


# ── Testimonials ─────────────────────────────────────────────────────────────────

class TestimonialListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = TestimonialAdminSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]

    def get_queryset(self):
        qs = Testimonial.objects.all()
        search = self.request.query_params.get("search")
        if search:
            qs = qs.filter(name__icontains=search)
        return qs


class TestimonialDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsAdminUser]
    serializer_class = TestimonialAdminSerializer
    parser_classes = [MultiPartParser, FormParser, JSONParser]
    queryset = Testimonial.objects.all()
