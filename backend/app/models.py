from typing import Any
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
from django.utils.translation import gettext_lazy as _

class StockSymbolModel(models.Model):
    symbol_name = models.CharField(max_length=10, unique=True)
    
    def __str__(self) -> str:
        return self.symbol_name

##########################              CUSTOM USER MANAGER           ##########################

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password = None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields) 
        # This refers to the model class that the manager is associated with. 
        # In this case, it's the custom user model class, 'CustomUser'.
        # By using self.model, you ensure that you create an instance of the correct user model associated with the manager.
        user.set_password(password)
        user.save(using=self._db)
        return user
    
    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        return self.create_user(email, password, **extra_fields)
    


##########################              CUSTOM USER MODEL           ##########################

class CustomUser(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    fullName = models.CharField(max_length=255, verbose_name='full_name')
    wishList = models.ManyToManyField(StockSymbolModel, null=True, blank=True, default=None)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    
    
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_users',  # Provide a unique related_name
        blank=True,
        verbose_name='groups',
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
    )

    # Example for user_permissions relationship
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_users_permissions',  # Provide a unique related_name
        blank=True,
        verbose_name='user permissions',
        help_text='Specific permissions for this user.',
        related_query_name='custom_user',
    )

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def __str__(self):
        return f'{self.fullName} ({self.email})'