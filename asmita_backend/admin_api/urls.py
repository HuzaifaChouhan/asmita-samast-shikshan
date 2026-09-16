from django.urls import path
from .views import (
    LoginView, LogoutView, MeView,
    StatsView,
    InquiryListView, InquiryDetailView,
    TeacherListCreateView, TeacherDetailView,
    TestimonialListCreateView, TestimonialDetailView,
)

urlpatterns = [
    # Auth
    path("auth/login/", LoginView.as_view(), name="admin-login"),
    path("auth/logout/", LogoutView.as_view(), name="admin-logout"),
    path("auth/me/", MeView.as_view(), name="admin-me"),

    # Stats
    path("stats/", StatsView.as_view(), name="admin-stats"),

    # Inquiries
    path("inquiries/", InquiryListView.as_view(), name="admin-inquiry-list"),
    path("inquiries/<int:pk>/", InquiryDetailView.as_view(), name="admin-inquiry-detail"),

    # Teachers
    path("teachers/", TeacherListCreateView.as_view(), name="admin-teacher-list"),
    path("teachers/<int:pk>/", TeacherDetailView.as_view(), name="admin-teacher-detail"),

    # Testimonials
    path("testimonials/", TestimonialListCreateView.as_view(), name="admin-testimonial-list"),
    path("testimonials/<int:pk>/", TestimonialDetailView.as_view(), name="admin-testimonial-detail"),
]
