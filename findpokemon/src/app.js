const pokeApi = new PokeApi();

let app = new Vue({
  el: ".meuPrimeiroApp",
  data: {
    idParaBuscar: "",
    pokemon: {},
    alerta: ""
  },
  methods: {
    async buscar(num) {
      this.alerta = "";
      this.pokemon = await pokeApi.buscar(num);
    },
    buscaRandomica() {
      this.idParaBuscar = "";
      let num = Math.floor(Math.random() * 802) + 1;
      if (this.economizar(num)) return;
      this.buscar(num);
    },
    checarNumero() {
      let num = this.idParaBuscar;
      if ((num && num < 1) || num > 802 || this.economizar(num)) this.erro();
      else this.buscar(num);
    },
    economizar(num) {
      return parseInt(num) === this.pokemon.id;
    },
    erro() {
      this.idParaBuscar = "";
      this.alerta = "ID inválido!";
      this.pokemon = {};
    }
  }
});
