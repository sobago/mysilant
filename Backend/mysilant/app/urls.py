from django.contrib import admin
from django.urls import path, include, re_path
from app import views

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi


schema_view = get_schema_view(
   openapi.Info(
      title="MySilant API",
      default_version='v1',
      description="",
      contact=openapi.Contact(email="contact@snippets.local"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=[permissions.AllowAny],
)

urlpatterns = [
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    re_path(r'^swagger/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    path('user', views.user, name='user'),
    path('users', views.users, name='users'),
    path('users_adm/', views.users_admin, name='users_adm'),
    path('users_adm/<int:pk>', views.UsersChange.as_view(), name='users_adm_change'),
    path('login', views.log_in, name='login'),
    path('logout', views.log_out, name='logout'),
    path('machines/', views.MachineList.as_view(), name='machines'),
    path('get_machine_id/', views.get_machine_id, name='get_machine_id'),
    path('machines/<int:pk>', views.MachineDetail.as_view(), name='machine'),
    path('to/', views.TechnicalServiceList.as_view(), name='tos'),
    path('to/<int:pk>', views.TechnicalServiceDetail.as_view(), name='to'),
    path('complaints/', views.ComplaintList.as_view(), name='complaints'),
    path('complaints/<int:pk>', views.ComplaintDetail.as_view(), name='complaint'),
    path('directory/', views.DirectoryList.as_view(), name='directories'),
    path('directory/<int:pk>', views.DirectoryDetail.as_view(), name='directory'),
]
