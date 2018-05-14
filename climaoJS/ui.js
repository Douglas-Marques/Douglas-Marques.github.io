class UI {
  constructor() {
    this.location = document.querySelector('#w-location');
    this.desc = document.querySelector('#w-desc');
    this.string = document.querySelector('#w-string');
    this.details = document.querySelector('#w-details');
    this.icon = document.querySelector('#w-icon');
    this.humidity = document.querySelector('#w-humidity');
    this.feelsLike = document.querySelector('#w-feels-like');
    this.dewpoint = document.querySelector('#w-dewpoint');
    this.wind = document.querySelector('#w-wind');
  }

  async paint(weather) {
    this.location.textContent = `${weather.name}, ${weather.state}`;
    this.desc.textContent = weather.data.temperature + ' °C';
    this.string.textContent = weather.data.condition;
    this.humidity.textContent = `Humidade relativa do ar: ${weather.data.humidity}`;
    this.feelsLike.textContent = `Atualização: ${weather.data.date}`;
    this.dewpoint.textContent = `Sensação térmica: ${weather.data.sensation}`;
    this.wind.textContent = `Velocidade do vento: ${weather.data.wind_velocity}`;
  }
}
