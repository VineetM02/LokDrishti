from rest_framework import serializers
from django.contrib.auth import get_user_model

User=get_user_model()

# added for user table information in db
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User # making sure to Use user model from db
        fields = ['id', 'username', 'email', 'member_since', 'total_contributions']

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) # for safety sathi diley response yetan disat nahi
    class Meta :
        model=User
        fields= ['username','email','password']
    #  this is for validation 
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user