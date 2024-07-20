from django.shortcuts import render
from .models import StockSymbolModel
from .serializers import UserRegistrationSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate, login, logout
import requests

from django.http import HttpResponse

# Create your views here.

def index(request):
    return render(request, 'index.html')




#############################################       AUTHENTICATION APIS     #############################################

@api_view(['POST'])
def register_user(request):
    print('form data:', request.data)
    if request.method == "POST":
        data = request.data
        serializer = UserRegistrationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_409_CONFLICT)
    

@api_view(["POST"])
def login_user(request):
    if request.method == "POST":
        email = request.data.get('email')
        pswd = request.data.get('password')
        
        user = authenticate(request, username=email, password=pswd)
        
        print("User:", user)
        if user:
            login(request, user)
            return Response({'message':"Login Successful"}, status=status.HTTP_200_OK)
        return Response({'message':"Login Failed"}, status=status.HTTP_401_UNAUTHORIZED)
    
@api_view(['GET'])
def check_authentication(request):
    if request.user.is_authenticated:
        return Response({'authenticated': True}, status=status.HTTP_200_OK)
    else:
        return Response({'authenticated': False}, status=status.HTTP_200_OK)

@api_view(['GET'])
def log_out_user(request):
    logout(request)
    return Response({'message': "Logout Successful"}, status=status.HTTP_200_OK)

#############################################       ADD WATCHLIST       #############################################

@api_view(['POST'])
def add_to_watchlist(request):
    if request.method == 'POST':
        user = request.user
        
        if not user.is_authenticated:
            return Response({'message': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        
        symbol_name = request.data.get('symbol_name')
                
        if not StockSymbolModel.objects.filter(symbol_name=symbol_name).exists():
            wl_item = StockSymbolModel.objects.create(symbol_name=symbol_name)
        else:
            wl_item = StockSymbolModel.objects.get(symbol_name=symbol_name)
            
        user.wishList.add(wl_item)
        
        
        return Response({"message": "Symbol added to wishlist successfully"}, status=status.HTTP_200_OK)
            
#############################################       RETURN WATCHLIST       #############################################

@api_view(['GET'])
def get_wish_list(request):
    if request.method == 'GET':
        user = request.user
        
        if not user:
            return Response({'message': 'User not aunthenticated'}, status=status.HTTP_401_UNAUTHORIZED)
        
        print('user:',user)
        print([item.symbol_name for item in user.wishList.all()])
        
        return Response({'watch_list':[item.symbol_name for item in user.wishList.all()]}, status=status.HTTP_200_OK)