import os
import time
import requests
from dotenv import load_dotenv
from django.core.cache import cache  # Import caching
from django.http import JsonResponse
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

# Load environment variables
load_dotenv()
CALENDARIFIC_API_KEY = os.getenv("CALENDARIFIC_API_KEY")  # Load from .env
print(CALENDARIFIC_API_KEY)
class HolidayAPI(APIView):
    def get(self, request):
        if not CALENDARIFIC_API_KEY:
            return Response({"error": "API Key missing"}, status=status.HTTP_401_UNAUTHORIZED)

        country = request.GET.get("country", "US")
        year = request.GET.get("year", "2024")
        
        cache_key = f"holidays_{country}_{year}"  # Unique cache key
        cached_data = cache.get(cache_key)

        if cached_data:
            print(f"Returning cached data for {country}-{year}")  # Debug log
            return Response(cached_data, status=status.HTTP_200_OK)
        
        # If not cached, fetch data from API
        url = f"https://calendarific.com/api/v2/holidays?api_key={CALENDARIFIC_API_KEY}&country={country}&year={year}"
        print(f"Requesting: {url}")  # Debug log
        for attempt in range(3):
            try:
                response = requests.get(url, timeout=10)
        
                if response.status_code == 200:
                    data = response.json()
                    cache.set(cache_key, data, timeout=2)  # Cache for 24 hours (86400 sec)
                    return Response(data, status=status.HTTP_200_OK)
            except requests.exceptions.RequestException as e:
                print(f"Attempt {attempt + 1} failed: {e}")
                time.sleep(2)  #retrying time
        return Response({"error": "Failed to fetch holidays", "status": response.status_code}, status=response.status_code)
