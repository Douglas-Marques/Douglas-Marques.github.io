class Weather {
  constructor(city) {
    this.apiKey = '9e1e50a0';
    this.city = city;
  }

  // Fetch weather from API
  async getWeather() {
    const response = await fetch(`https://api.hgbrasil.com/weather/?format=json-cors&city_name=${this.city}&key=${this.apiKey}`);   
    const responseData = await response.json();
    return responseData.results;
  }

  // Change weather location
  changeLocation(city) {
    this.city = city;
  }
}