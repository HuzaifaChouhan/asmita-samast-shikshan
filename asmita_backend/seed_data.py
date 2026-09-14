import os
import django

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "asmita_project.settings")
django.setup()

from teachers.models import Teacher
from testimonials.models import Testimonial

def run_seed():
    print("Seeding database...")
    
    # Teachers
    Teacher.objects.get_or_create(
        name="Dr. Rajesh Sharma",
        designation="Principal",
        subject="Mathematics",
        bio="Ph.D. in Mathematics with over 20 years of experience in academic leadership.",
        experience_years=20,
        is_active=True,
        display_order=1
    )
    Teacher.objects.get_or_create(
        name="Sunita Deshmukh",
        designation="Senior Teacher",
        subject="Science",
        bio="Passionate about making physical sciences interactive and engaging for students.",
        experience_years=12,
        is_active=True,
        display_order=2
    )

    # Testimonials
    Testimonial.objects.get_or_create(
        name="Anil Patil",
        role="Parent",
        message="Asmita Samast Shikshan has transformed my child's confidence and academic performance. Highly recommended!",
        rating=5,
        is_approved=True,
        is_featured=True
    )
    Testimonial.objects.get_or_create(
        name="Priya Kulkarni",
        role="Alumni",
        message="The foundational values and guidance I received here shaped my career success.",
        rating=5,
        is_approved=True,
        is_featured=False
    )
    print("Seeding completed successfully!")

if __name__ == "__main__":
    run_seed()