FROM python:3.11-slim

# Set the working directory inside the container
WORKDIR /app

# Copy requirements.txt from the build context (which is E:\django-project\Indigo\backend)
# It's at the same level as the Dockerfile if you build from 'backend' folder
COPY requirements.txt .

# Install Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire Django project (all files and folders in E:\django-project\Indigo\backend)
# into the /app directory inside the container.
# This means /app will contain manage.py, db.sqlite3, and the 'app' and 'backend' subdirectories.
COPY . .

# Expose the port your Django application will run on
EXPOSE 8000

# Command to run the Django development server
# manage.py is now directly in /app
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]