# Django settings for backend deployment on Render

ALLOWED_HOSTS = ["your-backend.onrender.com"]  # Update after deployment

INSTALLED_APPS = [
    # ...existing apps...
    "corsheaders",
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    # ...existing middleware...
]

CORS_ALLOWED_ORIGINS = [
    "https://your-frontend.vercel.app",
]

# ...other Django settings (database, templates, etc.)...
