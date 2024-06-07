# Travel Buddy, Summer Project

## Project Overview

This project is about planning a travel itinerary. It allows travellers to plan their trips by providing an interactive map, weather data also other useful features including currencies of the destination countries and creating a todo list of the things . The target group includes travellers who want to organize their travel plans efficiently. This project was created to help travelers have a seamless and enjoyable planning experience.

## Technologies Used

Built with:
- HTML
- JavaScript
- CSS
- Bootstrap
- React.js
- Symfony (for backend logic)
- Mapbox GL JS (for interactive maps)
- OpenWeatherMap API (for weather data)
- RestCountries (for the country names, languages and currencies)
- Wikipedia (for city specific information)

## Setup and Usage

To get started with this project, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/the-sankari/travel-buddy-team-3.git
    cd web/
    ```

2. **Install dependencies:**
    ```bash
    composer install
    cd frontend/
    npm install
    ```

3. **Set up environment variables:**
    Create a `.env.local` file and add your Mapbox and OpenWeatherMap API keys:
    ```env
    MAPBOX_API_KEY=your_mapbox_api_key
    WEATHER_API_KEY=your_openweathermap_api_key
    
    ```

4. **Run the Symfony server inside '/web':**
    ```bash
    symfony server:start
    ```

5. **Build assets inside '/web/frontend:**
    ```bash
    npm run dev
    ```

6. **Access the application:**
    Open your browser and navigate to `http://localhost:5173`.
## Live Page
We will deploy this project soon for live hosting

## Screenshot

![Screenshot of the Project](path/to/screenshot.png)

## Sources

- [GitHub Guides - Mastering Markdown](https://guides.github.com/features/mastering-markdown/)
- [Make a README](https://www.makeareadme.com/)

## Authors and Acknowledgments

- **Kajol Sutra Dhar**
- GitHub: [@kajol](https://https://github.com/the-sankari)
- **Tuomas Kohvakka**
- GitHub: [@tauoms](https://https://github.com/tauoms)
- **Sulaimon Ekundayo**
- GitHub: [@ekundayoSO](https://github.com/ekundayoSO)
- **Bishnu Suyel**
- GitHub: [@Bis10](https://github.com/Bis10)


