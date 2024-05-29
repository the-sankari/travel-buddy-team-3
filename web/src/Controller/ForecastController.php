<?php

namespace App\Controller;

use Symfony\Component\Routing\Annotation\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class ForecastController extends AbstractController
{
    private string $WEATHER_KEY;
    private $httpClient;

    public function __construct(HttpClientInterface $httpClient)
    {
        $this->WEATHER_KEY = $_ENV['WEATHER_KEY'];
        $this->httpClient = $httpClient;
    }

    #[Route("/api/forecast", name: "weather_forecast", methods: "POST")]
    public function getWeatherForecast(Request $request): JsonResponse
    {
        // Bind lat & lon received from frontend to be used in OpenWeather API call:
        $requestData = json_decode($request->getContent(), true);
        $lat = $requestData['lat'];
        $lon = $requestData['lon'];

        $weatherUrl = "https://api.openweathermap.org/data/2.5/forecast?lat={$lat}&lon={$lon}&appid={$this->WEATHER_KEY}&units=metric";
        $weatherResponse = $this->httpClient->request('GET', $weatherUrl);

        if ($weatherResponse->getStatusCode() !== 200) {
            return new JsonResponse(['error' => 'Unable to fetch data from the API'], JsonResponse::HTTP_BAD_REQUEST);
        }

        $weatherData = $weatherResponse->toArray();

        return new JsonResponse($weatherData);
    }
}
