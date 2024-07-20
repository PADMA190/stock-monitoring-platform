from rest_framework import serializers
from .models import CustomUser

class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('id', 'email', 'fullName', 'watchList')
        read_only_fields = ('id')

class UserRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ('email', 'password', 'fullName')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        # Hash the password before saving the user
        user = CustomUser.objects.create(
            email=validated_data['email'],
            fullName=validated_data['fullName']
        )
        user.set_password(validated_data['password'])  # Hash the password
        user.save()
        return user