from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from .serializers import RegisterSerializer, UserSerializer, LoginSerializer
from django.contrib.auth import authenticate, get_user_model
from rest_framework.permissions import AllowAny, IsAuthenticated
# Create your views here.
User = get_user_model()

# register endpoint
class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all() # TELLS DRF WHICH MODEL TO WORK WITH
    serializer_class = RegisterSerializer # USES SERIALIZER THAT WE MADE
    permission_classes = [AllowAny] # manages who can acces endpoint

class LoginView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']

        # For now, we just return basic info (no JWT yet)
        return Response({
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "message": "Login successful"
        }, status=status.HTTP_200_OK)