from django.db import models
from django.contrib.auth.models import User

<<<<<<< HEAD

class User(models.Model):

    ROLE_CHOICES = [
        ('user', 'User'),
        ('admin', 'Admin'),
    ]

    username = models.CharField(max_length=100, unique=True)

    email = models.EmailField(unique=True)

    password = models.CharField(max_length=255)

    role = models.CharField(
        max_length=10,
        choices=ROLE_CHOICES,
        default='user'
    )

    def __str__(self):
        return self.username



=======
>>>>>>> 7dd52382b5b95f3c3e9721929432ee238dce10f0
class Book(models.Model):
     title = models.CharField(max_length=200)
     author = models.CharField(max_length=100) 
     category = models.CharField(max_length=100)
     description = models.TextField(blank=True)
     def __str__(self):
          return str(self.title)
          
class Borrow(models.Model):
     user=models.ForeignKey(User,on_delete=models.CASCADE)
     book=models.ForeignKey(Book,on_delete=models.CASCADE)
     borrow_Date=models.DateField(auto_now_add=True)
     def __str__(self):
          return f"{self.user.username}borrowed{self.book.title}"       
          

<<<<<<< HEAD
    
=======
    
>>>>>>> 7dd52382b5b95f3c3e9721929432ee238dce10f0
