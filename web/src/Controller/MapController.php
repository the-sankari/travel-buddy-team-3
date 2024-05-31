<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class MapController extends AbstractController
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

    #[Route("/api/city-data", name: "api_city_data", methods: "POST")]
    public function getCityData(Request $request): JsonResponse
    {
        $requestData = json_decode($request->getContent(), true);
        $cityName = $requestData['cityName'];

        // Fetch coordinates from Mapbox Geocoding API
        $url = "https://api.mapbox.com/geocoding/v5/mapbox.places/{$cityName}.json?access_token={$this->MAP_KEY}";

        $response = $this->httpClient->request('GET', $url);
        $data = $response->toArray();

        if (empty($data['features'])) {
            return new JsonResponse(['error' => 'City not found'], 404);
        }

        $coordinates = $data['features'][0]['center']; // [lng, lat]
        $lat = $data['features'][0]['center'][1];
        $lon = $data['features'][0]['center'][0];

        // Find country name from response (to be used for REST countries API):
        $countryName = null;
        foreach ($data['features'][0]['context'] as $item) {
            if (strpos($item['id'], 'country') === 0) {
                $countryName = $item['text'];
                break;
            }
        }

        // Find city name from response:
        $displayedCityName = $data['features'][0]['text'];

        // Fetch weather data from OpenWeatherMap API:
        $weatherUrl = "https://api.openweathermap.org/data/2.5/weather?lat={$lat}&lon={$lon}&appid={$this->WEATHER_KEY}&units=metric";
        $weatherResponse = $this->httpClient->request('GET', $weatherUrl);
        $weatherData = $weatherResponse->toArray();

        return new JsonResponse([
            'coordinates' => ['lng' => $coordinates[0], 'lat' => $coordinates[1]],
            'weather' => $weatherData,
            'countryName' => $countryName,
            'displayedCityName' => $displayedCityName
        ]);
    }
}



