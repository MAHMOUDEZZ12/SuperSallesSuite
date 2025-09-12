# project/settings.py
import os
# ... other settings ...

# Use .get() to safely access the environment variable.
# This provides a temporary, insecure default ONLY for the build process.
# The production environment MUST have the SECRET_KEY environment variable set.
SECRET_KEY = os.environ.get('SECRET_KEY', 'django-insecure-temp-key-for-build-only')

# ... more settings ...
