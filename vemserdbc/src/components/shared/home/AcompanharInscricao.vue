<template>
  <section class="container-fluid p-2 acompanharInscricao">
    <div class="d-flex text-center h-100">
      <div class="p-5 w-100 text-white">
        <div class="search-box">
          <header class="header-search">
            <h1>Já se inscreveu?</h1>
            <p class="tagline">Acompanhe aqui o seu status:</p>
          </header>
          <form v-on:submit.prevent="noop">
            <input
              v-model="cpf"
              type="search"
              name="busca"
              id="busca"
              placeholder="Digite aqui o seu CPF"
              v-mask="'###.###.###-##'"
            >
            <button v-on:click="onSubmit" type="submit">
              <i class="fa fa-search"></i>
            </button>
            <Loader class="mt-5" v-if="carregando"/>
            <h5 class="mt-5" v-if="texto !== '' && !carregando">{{texto}}</h5>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Button from "../Button.vue";
import BackEndApi from "../../../api/backEndApi.js";
import Loader from "../Loader.vue";

export default {
  name: "ChamadaFinal",
  components: { Button, BackEndApi, Loader },
  data: () => {
    return {
      texto: "",
      cpf: "",
      carregando: false
    };
  },
  methods: {
    noop() {},
    async onSubmit() {
      this.carregando = true;
      const api = new BackEndApi();
      var cpf_ = this.cpf.replace(/\D/g, "");
      const response = await api.acompanharInscricao(cpf_);
      if (response.etapa === null || response.error) {
        this.texto = "O CPF digitado não está cadastrado na edição atual.";
        this.carregando = false;
        return;
      }
      var etapa;
      if (response.etapa === "PRE_SELECAO") {
        etapa = "Pré seleção";
      } else if (response.etapa === "PROCESSO_SELETIVO") {
        etapa = "Processo seletivo";
      } else if (response.etapa === "SELECIONADO") {
        etapa = "Selecionado";
      }

      if (response.status === "REJEITADA")
        this.texto = `Infelizmente você foi eliminado na etapa de ${etapa}`;
      else {
        this.texto = `Atualmente você se encontra na etapa de ${etapa}`;
      }
      this.carregando = false;
    }
  }
};
</script>
<style>
.acompanharInscricao {
  background-image: url("../../../assets/fundo-chamada-final.png");
  background-color: #e8eaed;
  height: 25rem;
  background-attachment: fixed;
  background-size: cover;
}

.search-box {
  text-align: center;
  color: #fff;
}

.search-box h1 {
  font-size: 37px;
  font-weight: bold;
}

.search-box .tagline {
  font-size: 26px;
}

.search-box form {
  position: relative;
  display: inline-block;
  width: 90%;
  max-width: 500px;
  margin-top: 40px;
}

.search-box form input[type="search"] {
  border: none;
  width: 100%;
  height: 50px;
  font-size: inherit;
  color: #2c3e50;
  padding: 0 70px 0 10px;
  border-radius: 6px;
  -webkit-border-radius: 6px;
}

.search-box form button:hover {
  background: rgb(0, 84, 168);
}

.search-box form button {
  background: rgba(0, 129, 255, 1);
  position: absolute;
  border: none;
  width: 50px;
  height: 50px;
  color: #fff;
  font-size: 20px;
  top: 0;
  right: 0;
  cursor: pointer;
  border-top-right-radius: 6px;
  -webkit-border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  -webkit-border-bottom-right-radius: 6px;
}
</style>


