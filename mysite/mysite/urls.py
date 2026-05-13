"""
URL configuration for mysite project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django import views
from django.contrib import admin
from django.urls import path
from mysite.pages.views import delete_book, delete_confirm, manage_books, search, borrowed_books
from mysite.pages import views

urlpatterns = [
    path('admin/', admin.site.urls),

    path('', views.home, name='home'),

    path('login/', views.login_view, name='login'),
    path('signup/', views.signup, name='signup'),

    path('search/', search, name='search'),
    path('borrowed-books/', borrowed_books, name='borrowed_books'),

    path('manage-books/', manage_books, name='manage_books'),
    path('delete-book/<int:book_id>/', delete_confirm, name='delete_confirm'),
    path('delete-book/<int:book_id>/confirm/', delete_book, name='delete_book'),

    path('add-book/', views.add_book, name='add_book'),
    path('edit-book/<int:id>/', views.edit_book, name='edit_book'),

    # press at search button, it will call search function in views.py and apply search logic, then render search.html with search results
    
    
]
