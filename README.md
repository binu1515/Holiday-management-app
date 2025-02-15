Holiday Explorer is a full-stack web application built with React (frontend) and Django (backend). It allows users to fetch and explore public holidays for a selected country and year using the Calendarific API. The app supports pagination, caching, and detailed holiday descriptions.
Features
![Screenshot 2025-02-15 200517](https://github.com/user-attachments/assets/5b4b08b0-7c44-4a14-904e-631ed0c32396)  
![Screenshot 2025-02-15 200449](https://github.com/user-attachments/assets/ee655fc4-8b71-451e-ab02-6724f70701d5)



Search holidays by country code and year.

Paginated results (10 holidays per page).

Click on a holiday to view detailed information.

Loading indicators while fetching data.

Caching using Memcached for optimized backend performance.

Tech Stack

Frontend (React)

React Router for navigation.

Axios for API calls.

Tailwind CSS for styling.

React useState & useEffect for state management.

Backend (Django)

Django REST Framework for API.

Memcached for caching.

Requests for external API calls.

Installation Guide

Prerequisites

Ensure you have the following installed:

Node.js & npm (for React)

Python 3 & pip (for Django)

Memcached (for caching, optional but recommended)

Backend Setup (Django)

Clone the repository:

git clone https://github.com/binu1515/Holiday-management-app.git
cd holiday-explorer/backend

Create and activate a virtual environment:

python -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

Configure Memcached in settings.py:

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.memcached.MemcachedCache',
        'LOCATION': '127.0.0.1:11211',
    }
}

Run the Django server:

python manage.py runserver

Frontend Setup (React)

Navigate to the React frontend directory:

cd ../frontend

Install dependencies:

npm install

Start the React development server:

npm start

API Endpoints

Backend API (/api/ endpoint)

GET /api/?country=<code>&year=<year> – Fetches holidays for the given country and year.

Example:

GET http://127.0.0.1:8000/api/?country=US&year=2024

React Routes

Route

Description

/

Home page (Search Holidays)

/details

Holiday Details Page

Usage

Enter a country code (e.g., US, IN).

Enter a year (e.g., 2024).

Click "Search" to fetch the holiday list.

Navigate pages using "Next" and "Previous" buttons.

Click on a holiday to view more details.
