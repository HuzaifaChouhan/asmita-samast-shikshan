from rest_framework import generics
from .models import Teacher
from .serializers import TeacherSerializer

class TeacherListView(generics.ListAPIView):
    queryset = Teacher.objects.filter(is_active=True)
    serializer_class = TeacherSerializer