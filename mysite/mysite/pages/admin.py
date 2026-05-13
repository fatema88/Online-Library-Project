from django.contrib import admin
from .models import Book, Borrow # تأكدي من أسماء الموديلات لديكِ

# تسجيل موديل الكتب
admin.site.register(Book)

# تسجيل موديل الاستعارة
admin.site.register(Borrow)
print("Admin site registered with Book and Borrow models")