from django.urls import path
from . import views

urlpatterns = [
    path('', views.home, name='home'),
    path('welcome/', views.welcome, name='welcome'),
    path('screen/', views.screen, name='screen'),
    path('apps/notepad/', views.app_notepad, name='app_notepad'),
    path('apps/mail/', views.app_mail, name='app_mail'),
    path('apps/documents/', views.app_documents, name='app_documents'),
    path('apps/browser/', views.app_browser, name='app_browser'),
    path('apps/secret/', views.app_secret, name='app_secret'),
    path('apps/evidence/', views.app_evidence, name='app_evidence'),
    path('apps/browser/myspace/', views.app_myspace, name='app_myspace'),
    path('apps/browser/myspacewall/', views.app_myspacewall, name='app_myspacewall'),
    path('conclusion/', views.conclusion, name='conclusion'),
]
