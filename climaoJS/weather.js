class Weather {
  constructor(city) {
    this.apiKey = 'f847ade5471761fd58cf43c6bb1828fd';
    this.city = city;    
  }

  // Fetch weather from API
  async getWeather() {
    return this.getCity().then(async results => {
      const response = await fetch(`http://apiadvisor.climatempo.com.br/api/v1/weather/locale/${results}/current?token=${this.apiKey}`);   
      const responseData = await response.json();
      return responseData;});
  }

  // Change weather location
  changeLocation(city) {
    this.city = city;
  }

  // Search and Fetch city from API
  async getCity() {
    const response = await fetch(`http://apiadvisor.climatempo.com.br/api/v1/locale/city?name=${this.city}&token=${this.apiKey}`);
    const responseData = await response.json();
    return responseData[0].id;
  };  
}
