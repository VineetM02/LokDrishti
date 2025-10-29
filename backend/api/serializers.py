from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth import authenticate

User=get_user_model()

# added for user table information in db
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User # making sure to Use user model from db
        fields = ['id', 'username', 'email', 'member_since', 'total_contributions']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True) # for safety sathi diley response yetan disat nahi
    confirm_password = serializers.CharField(write_only=True) 
    class Meta :
        model=User
        fields= ['username','email','password','confirm_password']
    
    # check is paasword and confirm_password match
    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"password": "Passwords do not match."})
        return data

    #  this is for validation 
    def create(self, validated_data):
        validated_data.pop('confirm_password')  # remove before creating user

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