<template>
  <section class="container-fuild p-3 m-0 gradiente">
    <div class="container">
      <div class="row m-3">
        <div class="col-4 col-sm-3 col-md-2 mr-auto bg-white shadow-lg p-2">
          <h5 class="text-center" id="botaoVoltar">
            <router-link :to="{ name: 'Candidatos'}">Voltar</router-link>
          </h5>
        </div>
      </div>
      <div class="row justify-content-center shadow-lg m-2 p-4 bg-white">
        <div class="col-12">
          <form id="formData" v-on:submit.prevent="noop">
            <h1 id="tituloEdicao">Detalhes da Edição</h1>
            <!-- Ano -->
            <div class="form-group">
              <label>Ano da edição:</label>
              <input
                type="text"
                class="form-control"
                v-validate="'required|numeric|min_value:2018|max_value:2030|digits:4'"
                v-bind:name="'Ano'"
                v-model="edicao.ano"
                v-mask="'####'"
                v-bind:placeholder="'Ex: 2019'"
                v-bind:data-vv-as="'Ano da edição'"
              >
              <span class="text-danger">{{errors.first("Ano")}}</span>
            </div>

            <!-- Numero -->
            <div class="form-group">
              <label>Número da edição:</label>
              <input
                type="text"
                class="form-control"
                v-validate="'required|numeric|min_value:1|max_value:4|digits:1'"
                v-bind:name="'Número da edição'"
                v-mask="'#'"
                v-model="edicao.numeroEdicao"
                v-bind:placeholder="'Ex: 2'"
                v-bind:data-vv-as="'Número da edição'"
              >
              <span class="text-danger">{{errors.first("Número da edição")}}</span>
            </div>

            <!-- Data inicio das inscrições: -->
            <div class="form-group">
              <label>Data de início das inscrições:</label>
              <input
                type="text"
                class="form-control"
                v-validate="'required|date_format:DD/MM/YYYY|date_between:01/01/2018,30/12/2030'"
                v-bind:name="'Data de Inicio da Inscricao'"
                v-model="edicao.dataInicioInscricao"
                v-mask="'##/##/####'"
                v-bind:data-vv-as="'Data de início das inscrições'"
              >
              <span class="text-danger">{{errors.first("Data de Inicio da Inscricao")}}</span>
            </div>

            <!-- Data final das inscrições: -->
            <div class="form-group">
              <label>Data final das inscrições:</label>
              <input
                type="text"
                v-mask="'##/##/####'"
                class="form-control"
                v-validate="'required|date_format:DD/MM/YYYY|date_between:01/01/2018,30/12/2030'"
                v-bind:name="'Data do Fim da Inscricao'"
                v-model="edicao.dataFimInscricao"
                v-bind:data-vv-as="'Data final das inscrições'"
              >
              <span class="text-danger">{{errors.first("Data do Fim da Inscricao")}}</span>
            </div>
            <!-- Data inicio do processo seletivo: -->
            <div class="form-group">
              <label>Data de início das inscrições:</label>
              <input
                type="text"
                class="form-control"
                v-validate="'required|date_format:DD/MM/YYYY|date_between:01/01/2018,30/12/2030'"
                v-bind:name="'Data do Inicio do Processo Seletivo'"
                v-model="edicao.dataInicioProcessoSeletivo"
                v-mask="'##/##/####'"
                v-bind:data-vv-as="'Data de início do processo seletivo:'"
              >
              <span class="text-danger">{{errors.first("Data do Inicio do Processo Seletivo")}}</span>
            </div>

            <!-- Data final do processo seletivo: -->
            <div class="form-group">
              <label>Data final das inscrições:</label>
              <input
                type="text"
                class="form-control"
                v-validate="'required|date_format:DD/MM/YYYY|date_between:01/01/2018,30/12/2030'"
                v-bind:name="'Data do Fim do Processo Seletivo'"
                v-model="edicao.dataFimProcessoSeletivo"
                v-mask="'##/##/####'"
                v-bind:data-vv-as="'Data final do processo seletivo'"
              >
              <span class="text-danger">{{errors.first("Data do Fim do Processo Seletivo")}}</span>
            </div>
            <!-- Data inicio: -->
            <div class="form-group">
              <label>Data de início:</label>
              <input
                type="text"
                class="form-control"
                v-validate="'required|date_format:DD/MM/YYYY|date_between:01/01/2018,30/12/2030'"
                v-bind:name="'Data de Inicio da capacitação'"
                v-model="edicao.dataInicio"
                v-mask="'##/##/####'"
                v-bind:data-vv-as="'Data de início'"
              >
              <span class="text-danger">{{errors.first("Data de Inicio da capacitação")}}</span>
            </div>

            <!-- Data de fim: -->
            <div class="form-group">
              <label>Data de fim:</label>
              <input
                type="text"
                class="form-control"
                v-validate="'required|date_format:DD/MM/YYYY|date_between:01/01/2018,30/12/2030'"
                v-bind:name="'Data de Fim da capacitação'"
                v-model="edicao.dataFim"
                v-mask="'##/##/####'"
                v-bind:data-vv-as="'Data de fim'"
              >
              <span class="text-danger">{{errors.first("Data de Fim da capacitação")}}</span>
            </div>
          </form>
        </div>
        <!-- End col  -->
        <div class="p-4">
          <ButtonNormal
            class="btn-lg"
            v-bind:onClick="editarEdicao"
            v-bind:texto="textoBotaoEditar"
          />

          <!-- Popup deletar -->
          <ButtonNormal
            class="btn-lg"
            v-bind:onClick="openDialogFromPage"
            v-bind:texto="textoBotaoExcluir"
          />

          <a11y-dialog id="page-dialog" app-root=".hello" @dialog-ref="assignDialogReference">
            <div>
              <h1 id="tituloEdicao">Você tem certeza?</h1>
              <p>Ao excluir essa edição, você não poderá mais voltar atrás.</p>
            </div>
            <div id="btnExcluir">
              <ButtonNormal
                class="btn-lg"
                v-bind:onClick="excluirEdicao"
                v-bind:texto="excluirDefinitivo"
              />
            </div>
          </a11y-dialog>
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
  name: "EditarEdicao",
  components: {
    ButtonNormal,
    InputForm,
    PopUp
  },
  props: {
    edicaoId: Number
  },
  data: () => {
    return {
      textoBotaoEditar: "Editar Edição",
      textoBotaoExcluir: "Excluir Edição",
      sairExclusao: "Sair",
      excluirDefinitivo: "Excluir definitivamente",
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
    assignDialogReference(dialog) {
      this.dialog = dialog;
    },

    openDialogFromPage() {
      if (this.dialog) {
        this.dialog.show();
      }
    },

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

    async excluirEdicao() {
      this.dialog.hide();
      this.popupShow = true;
      const api = new BackEndApi();
      const response = await api.excluirEdicao(this.edicao);
      this.showPopup(response);
    },

    async editarEdicao() {
      this.popupShow = true;
      const api = new BackEndApi();
      const response = await api.atualizarEdicao(this.edicao);
      this.showPopup(response);
    }
  },

  async created() {
    const api = new BackEndApi();
    this.edicao = this.$route.params.edicao;
  }
};
</script>
<style>
#botaoVoltar {
  padding-top: 0.5rem;
  padding-right: 0.1rem;
}

#btnSairExlusao {
  padding-top: 10rem;
}

#btnExcluir {
  padding-left: 5rem;
  padding-top: 1rem;
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
