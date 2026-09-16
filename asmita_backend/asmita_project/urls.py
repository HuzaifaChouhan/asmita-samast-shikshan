from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/teachers/", include("teachers.urls")),
    path("api/testimonials/", include("testimonials.urls")),
    path("api/inquiries/", include("admissions.urls")),
    path("api/admin/", include("admin_api.urls")),
]

# Serve media files during development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)