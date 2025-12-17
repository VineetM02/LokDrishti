from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate
from django.utils.text import slugify
from  api.models import Bills,Comment
from rest_framework import serializers
from django.contrib.auth.models import User
User=get_user_model()


# added for user table information in db
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User # making sure to Use user model from db
        fields = ['id', 'username', 'email', 'member_since', 'total_contributions']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user   
    
# Login 
class LoginSerializer(serializers.Serializer):
    identifier = serializers.CharField()  # can be username or email
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        identifier = data.get('identifier')
        password = data.get('password')
        
        # Try to find user by username first, then email
        user = User.objects.filter(username=identifier).first()
        if not user:
            user = User.objects.filter(email=identifier).first()

        if not user or not user.check_password(password):
            raise serializers.ValidationError("Invalid username/email or password.")
        
        data['user'] = user  # attach user object for use in the view
        return data


class BillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bills
        fields = [
            "id",
            "title",
            "description",
            "status",
            "slug",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["slug", "created_at", "updated_at"]

    def create(self, validated_data):
        # Auto-generate slug from title
        validated_data["slug"] = slugify(validated_data["title"])
        return super().create(validated_data)
    

class CommentSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username", read_only=True)
    bill_title = serializers.CharField(source="bill.title", read_only=True)

    class Meta:
        model = Comment
        fields = [
            "id",
            "bill",
            "bill_title",
            "user",
            "text",
            "sentiment",
            "sentiment_confidence",
            "created_at"
        ]
