import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'mysite.settings')
django.setup()

from mysite.pages.models import Book

# Add test books
books_data = [
    {'title': 'Clean Code', 'author': 'Robert C. Martin', 'category': 'Technology'},
    {'title': 'The Great Gatsby', 'author': 'F. Scott Fitzgerald', 'category': 'Fiction'},
    {'title': 'A Brief History of Time', 'author': 'Stephen Hawking', 'category': 'Science'},
    {'title': 'To Kill a Mockingbird', 'author': 'Harper Lee', 'category': 'Fiction'},
    {'title': 'Sapiens', 'author': 'Yuval Noah Harari', 'category': 'History'},
    {'title': '1984', 'author': 'George Orwell', 'category': 'Fiction'},
    {'title': 'Atomic Habits', 'author': 'James Clear', 'category': 'Self-Help'},
]

for book_data in books_data:
    Book.objects.create(**book_data)

print("✅ Books added successfully!")
print(f"Total books in database: {Book.objects.count()}")
