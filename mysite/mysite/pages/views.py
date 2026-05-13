
from django.shortcuts import render, redirect
from .models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login as auth_login
from mysite.pages.models import Book
from mysite.pages.models import Borrow
from django.shortcuts import render, get_object_or_404, redirect


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


def add_book(request):
    if request.method == "POST":
        Book.objects.create(
            title=request.POST['bookName'],
            author=request.POST['author'],
            category=request.POST['category'],
            description=request.POST['description']
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
        return redirect('manage_books')

    return render(request, 'add_edit_book.html', {'book': book})


def manage_books(request):
    books = Book.objects.all()

    title_filter = request.GET.get('title', '')
    author_filter = request.GET.get('author', '')
    category_filter = request.GET.get('category', '')

    if title_filter:
        books = books.filter(title__icontains=title_filter)
    if author_filter:
        books = books.filter(author__icontains=author_filter)
    if category_filter:
        books = books.filter(category__icontains=category_filter)

    return render(request, 'manage_books.html', {
        'books': books,
        'title_filter': title_filter,
        'author_filter': author_filter,
        'category_filter': category_filter
    })


def delete_confirm(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    return render(request, 'delete_confirm.html', {'book': book})


def delete_book(request, book_id):
    book = get_object_or_404(Book, id=book_id)
    book.delete()
    return redirect('manage_books')