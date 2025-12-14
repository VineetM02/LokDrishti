from django.urls import path
from .views import RegisterView, LoginView, AddBillView, UpdateBillView,home
from .views import DeleteBillView,AddCommentView,BillCommentsView,UserCommentsView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', LoginView.as_view(), name='login'),
    path("bills/add/", AddBillView.as_view(), name="add-bill"),
    path("bills/<slug:slug>/update/", UpdateBillView.as_view(), name="update-bill"),
    path("bills/<slug:slug>/delete/", DeleteBillView.as_view(), name="delete-bill"),
    path("bills/<slug:slug>/comments/", AddCommentView.as_view()),
    path("bills/<slug:slug>/comments/all/", BillCommentsView.as_view()),
    path("users/<int:user_id>/comments/", UserCommentsView.as_view()),
]