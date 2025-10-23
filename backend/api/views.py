from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import RegisterSerializer, UserSerializer
from django.contrib.auth import authenticate, get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated
# Create your views here.
User = get_user_model()

# register endpoint
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all() # TELLS DRF WHICH MODEL TO WORK WITH
    serializer_class = RegisterSerializer # USES SERIALIZER THAT WE MADE
    permission_classes = [AllowAny] # manages who can acces endpoint