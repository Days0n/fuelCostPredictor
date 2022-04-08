from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.template import Context, loader
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User

msg_login_error = "Invalid username or password."
msg_must_log_in = "Please log in first."
msg_password_mismatch = "Passwords do not match."
msg_username_unavail = "The username already exists, Please log in."
msg_register_success = "Registration successful! Please log in."


def login_page(request):
    if check_login(request):
        if "next" in request.GET:
            return HttpResponseRedirect(request.GET["next"])
        return HttpResponseRedirect('profile')

    else:
        context = {"msg_register_success": msg_register_success}

        reg_chk = check_register(request)
        if reg_chk[0]:
            context["register_success"] = True
        elif reg_chk[1] is not None:
            context["login_error"] = True
            context["error_msg"] = reg_chk[1][1]

        else:
            if request.POST: 
                context["login_error"] = True
                context["error_msg"] = msg_login_error

        context["action"] = "login"
        if "next" in request.GET:
            context["action"] += "?next=" + request.GET["next"]
            context["login_error"] = True
            context["error_msg"] = msg_must_log_in

        return render(request, 'fuelLog/login.html', context)


def check_login(request):
    if request.POST:
        if all(x in request.POST for x in ['username', 'password']):
            username = request.POST['username']
            password = request.POST['password']
            user = authenticate(request, username=username, password=password)
            if user is not None:
                if user.is_active:
                    login(request, user)
                    return True
    return False


def check_register(request):
    
    if request.POST:
        if all(x in request.POST for x in ['username-register',
                                           'password-register',
                                           'password-confirm']):
            username = request.POST['username-register']
            password = request.POST['password-register']
            password_confirm = request.POST['password-confirm']

            if password != password_confirm:
                return (False, (True, msg_password_mismatch))

            if User.objects.filter(username=username).exists():
               
                return (False, (True, msg_username_unavail))

            user = User.objects.create_user(username, None, password)
            user.save()
            return (True, (False, None))

    return (False, None)