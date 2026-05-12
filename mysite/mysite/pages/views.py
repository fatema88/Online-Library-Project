from django.shortcuts import render

from mysite.pages.models import Book
from mysite.pages.models import Borrow
from django.shortcuts import render, get_object_or_404, redirect


def search(request):
    query=request . GET.get('q')
    results =[]
    if query:
        results = Book.objects.filter(title__icontains=query) 
    return render(request, 'search.html', {'results': results,'query': query})

def borrowed_books(request):
    borrows =Borrow.objects.filter(user=request.user)
    return render (request,'borrowed_books.html',{'borrows':borrows})



def manage_books(request):
    # Get all the books from the database
    books = Book.objects.all()
    
    # Filtering by title, author, and category?
    title_filter = request.GET.get('title', '')
    author_filter = request.GET.get('author', '')
    category_filter = request.GET.get('category', '')
    
    # Apply filters
    if title_filter:
        books = books.filter(title__icontains=title_filter)
    if author_filter:
        books = books.filter(author__icontains=author_filter)
    if category_filter:
        books = books.filter(category__icontains=category_filter)
    
    # Pass data to template
    return render(request, 'manage_books.html', {
        'books': books,
        'title_filter': title_filter,
        'author_filter': author_filter,
        'category_filter': category_filter
    })

def delete_confirm(request, book_id):
    # Get the book from database, or show 404 if not found
    book = get_object_or_404(Book, id=book_id)
    
    # Pass book data to template
    return render(request, 'delete_confirm.html', {'book': book})

def delete_book(request, book_id):
    # Get the book
    book = get_object_or_404(Book, id=book_id)
    
    # Delete it from database
    book.delete()
    
    # Redirect back to manage_books
    return redirect('manage_books')