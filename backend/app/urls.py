from django.urls import path,re_path
from django.views.generic import TemplateView
from app import views

urlpatterns = [
    path('', views.index),
    path('user/register/', views.register_user),
    path('user/login/', views.login_user),
    path('user/isLoggedIn/', views.check_authentication),
    path('user/addSymbol/', views.add_to_watchlist),
    path('user/getWatchList/', views.get_wish_list),
    path('user/logout/', views.log_out_user),
    
    re_path(r'^', TemplateView.as_view(template_name='index.html'))
]
