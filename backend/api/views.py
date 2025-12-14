from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Bills
from django.http import HttpResponse
from .serializers import RegisterSerializer, UserSerializer, LoginSerializer,BillSerializer,CommentSerializer
from django.contrib.auth import authenticate, get_user_model
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated


def home(request):
    return HttpResponse("API is working!")

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
    
class AddBillView(APIView):
    def post(self,request):
        serializer=BillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=201)
        return Response(serializer.errors,status=400)

class UpdateBillView(APIView):
    def put(self, request, slug):
        try:
            bill = Bills.objects.get(slug=slug)
        except Bills.DoesNotExist:
            return Response({"error": "Bill not found"}, status=404)

        serializer = BillSerializer(bill, data=request.data, partial=False)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

    def patch(self, request, slug):
        try:
            bill = Bills.objects.get(slug=slug)
        except Bills.DoesNotExist:
            return Response({"error": "Bill not found"}, status=404)

        serializer = BillSerializer(bill, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=200)
        return Response(serializer.errors, status=400)

class DeleteBillView(APIView):
    def delete(self, request, slug):
        try:
            bill = Bills.objects.get(slug=slug)
        except Bills.DoesNotExist:
            return Response({"error": "Bill not found"}, status=404)

        bill.is_active = False
        bill.save()

        return Response({"message": "Bill deleted (soft delete)"}, status=200)
    
# i think have to add a endpoint to list all bills

#endpoint for adding comment

class AddCommentView(APIView):
    def post(self,request,slug):
        bill = get_object_or_404(Bills, slug=slug)
        # made this because we are receing only text from user have to add other fields
        # Inject bill + user into data before serializer validation
        data = {
            "bill": bill.id,
            "user": request.user.id,
            "text": request.data.get("text"),
            "sentiment": None   # or call ML model
        }

        serializer = CommentSerializer(data=data)

        if serializer.is_valid():
            serializer.save()  # saves to DB
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# endpoint for getting all comments for bill
class BillCommentsView(APIView):
    def get(self, request, slug):
        bill = get_object_or_404(Bills, slug=slug)
        comments = bill.comments.all().order_by("-created_at")

        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=200)

#for profile page getting all comments for user
class UserCommentsView(APIView):
    def get(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        comments = user.comments.all().order_by("-created_at")
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data, status=200)


#Bills - admin ka add,delete,update endpoint- changes should be reflected on user and admin pages
#Comments - User side : Comment when added by user should be seen by user in his profile, 
#         -             also seen by other users for that particular bill
#         - Admin side : Comment should be anlayzed in model should be seen on dashboard