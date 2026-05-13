<<<<<<< HEAD

from django.shortcuts import render, redirect
from .models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login as auth_login
=======
from django.shortcuts import render

>>>>>>> 7dd52382b5b95f3c3e9721929432ee238dce10f0
from mysite.pages.models import Book
from mysite.pages.models import Borrow
from django.shortcuts import render, get_object_or_404, redirect


<<<<<<< HEAD
def home(request):
    return render(request, 'home.html')


def signup(request):
    if request.method == "POST":
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        role = request.POST.get('role')

        User.objects.create(
            username=username,
            email=email,
            password=password,
            role=role
        )

        if role == "admin":
            return redirect('add_book')

        return redirect('search')

    return render(request, 'signup.html')


def login_view(request):
    if request.method == "POST":
        email = request.POST.get('email')
        password = request.POST.get('pass')

        try:
            user = User.objects.get(email=email, password=password)

            request.session['user_id'] = user.id
            request.session['user_role'] = user.role
            request.session['username'] = user.username

            if user.role == "admin":
                return redirect('add_book')
            else:
                return redirect('search')

        except User.DoesNotExist:
            messages.error(request, "Invalid email or password")
            return redirect('login')

    return render(request, 'login.html')


def search(request):
    query = request.GET.get('q')
    results = []
    if query:
        results = Book.objects.filter(title__icontains=query)
    return render(request, 'search.html', {'results': results, 'query': query})


def borrowed_books(request):
    borrows = Borrow.objects.filter(user=request.user)
    return render(request, 'borrowed_books.html', {'borrows': borrows})
=======
def search(request):
    query=request . GET.get('q')
    results =[]
    if query:
        results = Book.objects.filter(title__icontains=query) 
    return render(request, 'search.html', {'results': results,'query': query})

def borrowed_books(request):
    borrows =Borrow.objects.filter(user=request.user)
    return render (request,'borrowed_books.html',{'borrows':borrows})

#home just for now
def home(request):
    return render(request, 'home.html')
>>>>>>> 7dd52382b5b95f3c3e9721929432ee238dce10f0


def add_book(request):
    if request.method == "POST":
        Book.objects.create(
<<<<<<< HEAD
            title=request.POST['bookName'],
            author=request.POST['author'],
            category=request.POST['category'],
            description=request.POST['description']
=======
            title = request.POST['bookName'],
            author = request.POST['author'],
            category = request.POST['category'],
            description = request.POST['description']
>>>>>>> 7dd52382b5b95f3c3e9721929432ee238dce10f0
        )
        return redirect('manage_books')

    return render(request, 'add_edit_book.html')


def edit_book(request, id):
    book = get_object_or_404(Book, id=id)

    if request.method == "POST":
        book.title = request.POST['bookName']
        book.author = request.POST['author']
        book.category = request.POST['category']
        book.description = request.POST['description']
        book.save()
<<<<<<< HEAD
=======

>>>>>>> 7dd52382b5b95f3c3e9721929432ee238dce10f0
        return redirect('manage_books')

    return render(request, 'add_edit_book.html', {'book': book})


<<<<<<< HEAD
def manage_books(request):
    books = Book.objects.all()

    title_filter = request.GET.get('title', '')
    author_filter = request.GET.get('author', '')
    category_filter = request.GET.get('category', '')

=======

def manage_books(request):
    # Get all the books from the database
    books = Book.objects.all()
    
    # Filtering by title, author, and category?
    title_filter = request.GET.get('title', '')
    author_filter = request.GET.get('author', '')
    category_filter = request.GET.get('category', '')
    
    # Apply filters
>>>>>>> 7dd52382b5b95f3c3e9721929432ee238dce10f0
    if title_filter:
        books = books.filter(title__icontains=title_filter)
    if author_filter:
        books = books.filter(author__icontains=author_filter)
    if category_filter:
        books = books.filter(category__icontains=category_filter)
<<<<<<< HEAD

=======
    
    # Pass data to template
>>>>>>> 7dd52382b5b95f3c3e9721929432ee238dce10f0
    return render(request, 'manage_books.html', {
        'books': books,
        'title_filter': title_filter,
        'author_filter': author_filter,
        'category_filter': category_filter
    })

<<<<<<< HEAD

def delete_confirm(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    return render(request, 'delete_confirm.html', {'book': book})


def delete_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    book.delete()
    return redirect('manage_books')
=======
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
>>>>>>> 7dd52382b5b95f3c3e9721929432ee238dce10f0
