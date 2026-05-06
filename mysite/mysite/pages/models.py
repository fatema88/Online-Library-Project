from django.db import models
from django.contrib.auth.models import User

class Book(models.Model):
     title = models.CharField(max_length=200)
     author = models.CharField(max_length=100) 
     category = models.CharField(max_length=100)
     def __str__(self):
          return self.title
class Borrow(models.Model):
     user=models.ForeignKey(User,on_delete=models.CASCADE)
     book=models.ForeignKey(Book,on_delete=models.CASCADE)
     borrow_Date=models.DateField(auto_now_add=True)
     def __str__(self):
          return f"{self.user.username}borrowed{self.book.title}"       
          

    