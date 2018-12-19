<template>
  <section class="container-fuild p-3 m-0 gradiente">
    <div class="container">
      <div class="row m-3">
        <div class="col-4 col-sm-3 col-md-2 mr-auto bg-white shadow-lg p-2">
          <h5 class="text-center" id="btnVoltar">
            <router-link :to="{ name: 'Candidatos'}">Voltar</router-link>
          </h5>
        </div>
      </div>
      <div class="row justify-content-center shadow-lg m-2 p-4 bg-white">
        <div class="col-12">
          <form id="formData" v-on:submit.prevent="onSubmit">
            <h1 id="tituloEdicao">Cadastro de Edição</h1>
            <!-- Ano -->
            <InputForm
              nome="Ano"
              label="Ano da Edição"
              rules="required|numeric|min_value:2018|max_value:2030|digits:4"
              :mask="'####'"
              placeholder="Ex: 2019"
              ref="ano"
            />

            <!-- Numero -->
            <InputForm
              nome="numeroEdicao"
              label="Número da Edição"
              rules="required|numeric|min_value:1|max_value:4|digits:1"
              :mask="'#'"
              placeholder="Ex: 2"
              ref="numeroEdicao"
            />
            <!-- Data de inicio das inscrições: -->
            <InputForm
              nome="dataInicioInscricao"
              label="Data de inicio das inscrições"
              rules="required|date_format:DD/MM/YYYY|date_between:01/01/2018,30/12/2030"
              :mask="'##/##/####'"
              placeholder="Ex: 29/07/2018"
              ref="dataInicioInscricao"
            />
            <!-- Data final das inscrições: -->
            <InputForm
              nome="dataFimInscricao"
              label="Data final das inscrições"
              rules="required|date_format:DD/MM/YYYY|date_between:01/01/2018,30/12/2030"
              :mask="'##/##/####'"
              placeholder="Ex: 18/08/2018"
              ref="dataFimInscricao"
            />
            <!-- Data de inicio do processo seletivo: -->
            <InputForm
              nome="dataInicioProcessoSeletivo"
              label="Data de inicio do processo seletivo"
              rules="required|date_format:DD/MM/YYYY|date_between:01/01/2018,30/12/2030"
              :mask="'##/##/####'"
              placeholder="Ex: 01/09/2018"
              ref="dataInicioProcessoSeletivo"
            />
            <!-- Data final do processo seletivo: -->
            <InputForm
              nome="dataFimProcessoSeletivo"
              label="Data final do processo seletivo"
              rules="required|date_format:DD/MM/YYYY|date_between:01/01/2018,30/12/2030"
              :mask="'##/##/####'"
              placeholder="Ex: 03/09/2018"
              ref="dataFimProcessoSeletivo"
            />
            <!-- Data inicio: -->
            <InputForm
              nome="dataInicio"
              label="Data de início da capacitação"
              rules="required|date_format:DD/MM/YYYY|date_between:01/01/2018,30/12/2030"
              :mask="'##/##/####'"
              placeholder="Ex: 03/09/2018"
              ref="dataInicio"
            />

            <!-- Data de fim: -->
            <InputForm
              nome="dataFim"
              label="Data final da capacitação"
              rules="required|date_format:DD/MM/YYYY|date_between:01/01/2018,30/12/2030"
              :mask="'##/##/####'"
              placeholder="Ex: 20/11/2018"
              ref="dataFim"
            />
          </form>
        </div>
        <!-- End col  -->
        <div class="p-4">
          <ButtonNormal
            class="btn-lg"
            v-bind:onClick="onSubmit"
            v-bind:texto="textoBotao"
            type="submit"
          />
        </div>
      </div>
      <!-- End row  -->
      <PopUp :show="popupShow" :loading="popupLoading" :error="popupError"/>
    </div>
    <!-- End container  -->
  </section>
</template>

<script>
import ButtonNormal from "../shared/ButtonNormal.vue";
import InputForm from "../shared/InputForm.vue";
import PopUp from "../shared/PopUp.vue";
import CorreiosApi from "../../api/correioApi";
import BackEndApi from "../../api/backEndApi.js";

export default {
  name: "CadastroEdicao",
  components: {
    ButtonNormal,
    InputForm,
    PopUp
  },
  data: () => {
    return {
      textoBotao: "Adicionar Edição",
      endUser: "",
      color: "",
      edicao: {},
      popupLoading: true,
      popupShow: false,
      popupError: false
    };
  },
  methods: {
    noop() {},

    showPopup(response) {
      if (!response.error) {
        this.popupLoading = false;
        setTimeout(() => {
          this.popupShow = false;
          this.popupLoading = true;
          this.$router.push({ name: "Candidatos" });
        }, 1500);
      } else {
        this.popupLoading = false;
        this.popupError = true;
        setTimeout(() => {
          this.popupShow = false;
          this.popupLoading = true;
          this.popupError = false;
        }, 1500);
      }
    },

    async onSubmit() {
      /*metodo que salva o edição no banco*/
      this.popupShow = true;
      this.edicao = {
        ano: this.$refs.ano.value,
        numeroEdicao: this.$refs.numeroEdicao.value,
        dataInicio: this.$refs.dataInicio.value,
        dataFim: this.$refs.dataFim.value,
        dataInicioInscricao: this.$refs.dataInicioInscricao.value,
        dataFimInscricao: this.$refs.dataFimInscricao.value,
        dataInicioProcessoSeletivo: this.$refs.dataInicioProcessoSeletivo.value,
        dataFimProcessoSeletivo: this.$refs.dataFimProcessoSeletivo.value
      };
      const api = new BackEndApi();
      const response = await api.cadastrarEdicao(this.edicao);
      this.showPopup(response);
    }
  }
};
</script>
<style>
#btnVoltar {
  padding-right: 0.1rem;
  padding-top: 0.5rem;
}

#tituloEdicao {
  text-align: center;
}

.gradiente {
  background-image: linear-gradient(
    120deg,
    rgb(53, 208, 88),
    rgb(61, 131, 206)
  );
}
</style>
