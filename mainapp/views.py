from django.shortcuts import render

def home(request):
    return render(request, 'index.html')

def welcome(request):
    return render(request, 'welcome.html')

def screen(request):
    return render(request, 'screen.html')

def app_notepad(request):
    return render(request, 'apps/notepad.html')

def app_mail(request):
    return render(request, 'apps/mail.html')

def app_documents(request):
    return render(request, 'apps/documents.html')

def app_browser(request):
    return render(request, 'apps/browser.html')

def app_secret(request):
    return render(request, 'apps/secret.html')

def app_evidence(request):
    return render(request, 'apps/evidence.html')

def app_myspace(request):
    return render(request, 'apps/myspace.html')

def app_myspacewall(request):
    return render(request, 'apps/myspacewall.html')

def conclusion(request):
    return render(request, 'conclusion.html')
