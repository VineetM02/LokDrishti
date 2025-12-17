from django.urls import path
from .views import AdminBillListView, AdminDashboardView, BillDetailView, BillSentimentSummaryView, BillSentimentTrendView, PublicStatsView, RegisterView, LoginView, AddBillView, UpdateBillView,home
from .views import DeleteBillView,AddCommentView,BillCommentsView,UserCommentsView,BillListView
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    # -------- AUTH --------
    path("register/", RegisterView.as_view()),
    path("login/", LoginView.as_view()),

    # -------- USER BILLS --------
    path("bills/", BillListView.as_view()),
    path("bills/add/", AddBillView.as_view()),

    # -------- COMMENTS (SPECIFIC FIRST) --------
    path("bills/<slug:slug>/comment/", AddCommentView.as_view()),     # POST
    path("bills/<slug:slug>/comments/", BillCommentsView.as_view()),  # GET

    # -------- SENTIMENT DASHBOARD (SPECIFIC FIRST) --------
    path(
        "bills/<slug:slug>/sentiment-summary/",
        BillSentimentSummaryView.as_view()
    ),
    path(
        "bills/<slug:slug>/sentiment-trend/",
        BillSentimentTrendView.as_view()
    ),

    # -------- BILL DETAIL / UPDATE (GENERIC LAST) --------
    path("bills/<slug:slug>/", UpdateBillView.as_view()),

    # -------- USER --------
    path("users/<int:user_id>/comments/", UserCommentsView.as_view()),
    path("public/stats/", PublicStatsView.as_view()),

    # -------- ADMIN --------
    path("admin/bills/", AdminBillListView.as_view()),
    path("admin/dashboard/", AdminDashboardView.as_view()),
]
