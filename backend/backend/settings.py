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
    "https://deploy-git-main-dakshhhhh16s-projects.vercel.app/",
]

# ...other Django settings (database, templates, etc.)...
