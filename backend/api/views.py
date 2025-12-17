from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Bills, Comment
from django.db.models import Count
from django.http import HttpResponse
from .serializers import RegisterSerializer, UserSerializer, LoginSerializer,BillSerializer,CommentSerializer
from django.contrib.auth import authenticate, get_user_model
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from rest_framework.permissions import AllowAny, IsAuthenticated

#tanisha
from sentiment.sentiment_utils import analyze_sentiment
from django.db.models import Count
from django.db.models.functions import TruncDate

def home(request):
    return HttpResponse("API is working!")

# Create your views here.
User = get_user_model()

# register endpoint
class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully"},
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
    def get(self, request, slug):
        bill = get_object_or_404(Bills, slug=slug)
        serializer = BillSerializer(bill)
        return Response(serializer.data, status=200)

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
    def patch(self, request, slug):
        bill = get_object_or_404(Bills, slug=slug)
        bill.status = "deleted"
        bill.save()

        return Response(
            {"message": "Bill deleted successfully"},
            status=status.HTTP_200_OK
        )


#tanisha  
# Fetch one bill’s complete data. 
class BillDetailView(APIView):
    def get(self, request, slug):
        bill = get_object_or_404(Bills, slug=slug)
        serializer = BillSerializer(bill)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Admin sees ALL bills, not just active ones.
class AdminBillListView(APIView):
    permission_classes = [AllowAny] # IsAuthenticated

    def get(self, request):
        bills = Bills.objects.all().order_by("-created_at")
        serializer = BillSerializer(bills, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


# Returns aggregated numbers for dashboard cards.
class AdminDashboardView(APIView):
    permission_classes = [AllowAny] #IsAuthenticated

    def get(self, request):
        total_bills = Bills.objects.count()
        active_bills = Bills.objects.filter(is_active=True).count()

        total_comments = Comment.objects.count()

        sentiment_counts = Comment.objects.values("sentiment").annotate(
            count=Count("sentiment")
        )

        sentiment_data = {"positive": 0, "negative": 0, "neutral": 0}
        for item in sentiment_counts:
            sentiment_data[item["sentiment"]] = item["count"]

        return Response({
            "total_bills": total_bills,
            "active_bills": active_bills,
            "total_comments": total_comments,
            "sentiment": sentiment_data
        }, status=status.HTTP_200_OK)
    
# Returns percentage distribution of sentiments.
class BillSentimentSummaryView(APIView):
    def get(self, request, slug):
        bill = get_object_or_404(Bills, slug=slug)
        total = bill.comments.count()

        counts = {"positive": 0, "negative": 0, "neutral": 0}
        percentages = {"positive": 0, "negative": 0, "neutral": 0}

        if total > 0:
            summary = bill.comments.values("sentiment").annotate(count=Count("id"))
            for item in summary:
                counts[item["sentiment"]] = item["count"]
                percentages[item["sentiment"]] = round(
                    (item["count"] / total) * 100, 2
                )

        return Response({
            "total": total,
            "counts": counts,
            "percentages": percentages
        })

# Shows daily sentiment trend.
class BillSentimentTrendView(APIView):
    def get(self, request, slug):
        bill = get_object_or_404(Bills, slug=slug)

        trend = (
            bill.comments
            .annotate(date=TruncDate("created_at"))
            .values("date")
            .annotate(count=Count("id"))
            .order_by("date")
        )

        return Response(trend, status=200)



# i think have to add a endpoint to list all bills

#endpoint for adding comment

class AddCommentView(APIView):
    permission_classes = [AllowAny] # after jwt - IsAuthenticated kr

    def post(self,request,slug):
        bill = get_object_or_404(Bills, slug=slug)
        # made this because we are receing only text from user have to add other fields
        # Inject bill + user into data before serializer validation

        comment_text = request.data.get("text")
        if not comment_text:
            return Response(
                {"error": "Comment text is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # 🔹 CALL SENTIMENT ANALYSIS HERE
        try:
            result = analyze_sentiment(comment_text)
        except Exception as e:
            return Response(
                {
                    "error": "Sentiment analysis failed",
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
        
        # 🔹 Prepare data for serializer
        data = {
            "bill": bill.id,
            "user": request.user.id if request.user.is_authenticated else None, # request.user.id - after jwt
            "text": comment_text,
            "sentiment": result["sentiment"].lower(),  # positive / negative / neutral
            "sentiment_confidence": result["confidence"]
        }
        serializer = CommentSerializer(data=data)
        if serializer.is_valid():
            serializer.save()  # saves to DB
            return Response(
                {
                    "message": "Comment added successfully",
                    "sentiment": result["sentiment"],
                    "confidence": result["confidence"]
                },
                status=status.HTTP_201_CREATED
            )
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
    

class ProtectedView(APIView):
    permission_classes = [AllowAny] #IsAuthenticated

    def get(self, request):
        return Response({"message": "You are authenticated"})


from rest_framework.permissions import AllowAny

# tanisha
# list active bills to the users
class BillListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        bills = Bills.objects.filter(status="active").order_by("-created_at")
        serializer = BillSerializer(bills, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = BillSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)

# Total Comments & Citizen Participants (unique users who commented) -For Home page
class PublicStatsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        total_comments = Comment.objects.count()

        # Count unique users who have commented
        citizen_participants = (
            Comment.objects
            .exclude(user__isnull=True)
            .values("user")
            .distinct()
            .count()
        )

        return Response({
            "total_comments": total_comments,
            "citizen_participants": citizen_participants
        }, status=status.HTTP_200_OK)


#Bills - admin ka add,delete,update endpoint- changes should be reflected on user and admin pages
#Comments - User side : Comment when added by user should be seen by user in his profile, 
#         -             also seen by other users for that particular bill
#         - Admin side : Comment should be anlayzed in model should be seen on dashboard