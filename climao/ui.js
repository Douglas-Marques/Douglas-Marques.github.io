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
    this.location.textContent = weather.city_name;
    this.desc.textContent = weather.temp + ' °C';
    this.string.textContent = weather.description;
    this.icon.setAttribute('src', `https://assets.hgbrasil.com/weather/images/${weather.img_id}.png`);
    this.humidity.textContent = `Humidade relativa do ar: ${weather.humidity}`;
    this.feelsLike.textContent = `Atualização: ${weather.time}`;
    this.dewpoint.textContent = `Pôr do sol: ${weather.sunset}`;
    this.wind.textContent = `Velocidade do vento: ${weather.wind_speedy}`;
  }
}