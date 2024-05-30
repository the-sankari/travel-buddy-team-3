<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class GeolocationController extends AbstractController
{
    private $httpClient;
    private $MAP_KEY;
    private $WEATHER_KEY;

    public function __construct(HttpClientInterface $httpClient)
    {
        $this->httpClient = $httpClient;
        $this->MAP_KEY = $_ENV['MAP_KEY'];
        $this->WEATHER_KEY = $_ENV['WEATHER_KEY'];
    }

    #[Route("/api/geolocation", name: "api_geolocation", methods: ["POST"])]
    public function getUserCity(Request $request): JsonResponse
    {
        $requestData = json_decode($request->getContent(), true);
        
        if (!isset($requestData['lat'], $requestData['lon'])) {
            return new JsonResponse(['error' => 'Latitude and longitude are required'], 400);
        }

        $lat = $requestData['lat'];
        $lon = $requestData['lon'];

        try {
            // Fetch coordinates from Mapbox Geocoding API
            $url = "https://api.mapbox.com/geocoding/v5/mapbox.places/{$lon},{$lat}.json?types=place&access_token={$this->MAP_KEY}";
            $response = $this->httpClient->request('GET', $url);
            $data = $response->toArray();

            if (empty($data['features'])) {
                return new JsonResponse(['error' => 'City not found'], 404);
            }

            // Find city (place) name from response
            $cityName = null;
            foreach ($data['features'][0]['context'] as $item) {
                if (strpos($item['id'], 'place') === 0) {
                    $cityName = $item['text'];
                    break;
                }
            }

            if ($cityName === null) {
                return new JsonResponse(['error' => 'City name not found'], 404);
            }

            // Fetch weather data from OpenWeatherMap API
            $weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat={$lat}&lon={$lon}&appid={$this->WEATHER_KEY}&units=metric";
            $weatherResponse = $this->httpClient->request('GET', $weatherUrl);
            $weatherData = $weatherResponse->toArray();

            return new JsonResponse([
                'cityName' => $cityName,
                'weather' => $weatherData
            ]);
        } catch (\Exception $e) {
            return new JsonResponse(['error' => 'An error occurred while processing your request'], 500);
        }
    }
}
