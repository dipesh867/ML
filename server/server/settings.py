"""
Django settings for server project - Hosting Ready (Plain Django)
"""

from pathlib import Path
import os
from dotenv import load_dotenv

# ----------------------------
# BASE DIRECTORY
# ----------------------------
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from .env
load_dotenv(BASE_DIR / '.env')

# ----------------------------
# SECURITY
# ----------------------------
SECRET_KEY = os.environ.get('DJANGO_SECRET_KEY', 'django-insecure-t0rh)+q2fz5y9l(#psxhn9eh!u)297@ybfz#lpx1fz-oq7os^x')

DEBUG = False  # Must be False in production

ALLOWED_HOSTS = ['motherlandacademybrt.com', 'www.motherlandacademybrt.com']

# ----------------------------
# APPLICATIONS
# ----------------------------
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'myapp',  # your app
]

# ----------------------------
# MIDDLEWARE
# ----------------------------
MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'server.urls'

# ----------------------------
# TEMPLATES
# ----------------------------
TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],  # templates are inside app folders
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'server.wsgi.application'

# ----------------------------
# DATABASE
# ----------------------------
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.mysql',
        'NAME': os.environ.get('DB_NAME', 'motherland'),
        'USER': os.environ.get('DB_USER', 'root'),
        'PASSWORD': os.environ.get('DB_PASSWORD', 'VScode@123'),
        'HOST': os.environ.get('DB_HOST', 'localhost'),
        'PORT': os.environ.get('DB_PORT', '3306'),
    }
}

# ----------------------------
# PASSWORD VALIDATION
# ----------------------------
AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',},
]

# ----------------------------
# INTERNATIONALIZATION
# ----------------------------
LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True

# ----------------------------
# STATIC & MEDIA FILES
# ----------------------------
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'  # collectstatic will store here
STATICFILES_DIRS = [BASE_DIR / "static"]  # local static files folder

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'

# ----------------------------
# SECURITY ENHANCEMENTS
# ----------------------------
SECURE_SSL_REDIRECT = True  # redirect HTTP to HTTPS
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

SECURE_HSTS_SECONDS = 3600
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# ----------------------------
# DEFAULT PRIMARY KEY FIELD
# ----------------------------
DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'
