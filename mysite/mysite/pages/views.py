from django.shortcuts import render

from mysite.pages.models import Book
from mysite.pages.models import Borrow


def search(request):
    query=request . GET.get('q')
    results =[]
    if query:
        results = Book.objects.filter(title__icontains=query) 
    return render(request, 'search.html', {'results': results,'query': query})

def borrowed_books(request):
    borrows =Borrow.objects.filter(user=request.user)
    return render (request,'borrowed_books.html',{'borrows':borrows})
