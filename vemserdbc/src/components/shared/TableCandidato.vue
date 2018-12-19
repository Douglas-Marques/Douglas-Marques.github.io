<template>
  <div class="container">
    <div class="row col-lg-12 mb-3">
      <div class="row col-lg-12 mb-3" id="linhaDois">
        <div class="input-group col-md-4 col-lg-3 mb-1">
          <select
            title="Selecione o periodo"
            class="form-control etapas"
            v-model="etapaSelecionada"
          >
            <option
              v-for="etapa in etapas"
              v-bind:key="etapa.id"
              v-bind:value="etapa"
            >{{etapa.nome}}</option>
            <option v-bind:value="'Todas'">Todas</option>
          </select>
        </div>
        <div class="input-group col-md-6 col-lg-6 mb-1">
          <select
            title="Selecione o periodo"
            class="form-control etapas"
            v-model="edicaoSelecionada"
          >
            <option
              v-for="edicao in edicoes"
              v-bind:key="edicao.id"
              v-bind:value="edicao"
            >{{edicao.ano}}/{{edicao.numeroEdicao}}</option>
          </select>
          <div id="espacoDiv">
            <ButtonNormal
              class="btn ml-auto"
              v-bind:onClick="adicionarEdicao"
              v-bind:texto="textoAddEdicoes"
              type="submit"
            />
          </div>
          <div id="espacoDiv">
            <ButtonNormal
              class="btn"
              v-bind:onClick="editarEdicao"
              v-bind:texto="textoEdicoes"
              v-bind:disabled="edicoes.length==0"
              type="submit"
            />
          </div>
        </div>
      </div>

      <div class="row col-lg-12 mb-3" id="linhaUm">
        <div class="input-group col-md-4 col-lg-3 mb-1">
          <div class="input-group-prepend">
            <span class="input-group-text">Ranking</span>
          </div>
          <div class="ranking">
            <toggle-button
              v-model="ranking"
              switchColor="{checked: 'inear-gradient(
            rgba(53, 208, 89, 0.767),
            rgba(61, 131, 206, 0.822)
          )', unchecked: 'inear-gradient(
            rgba(53, 208, 89, 0.767),
            rgba(61, 131, 206, 0.822)
          )'}"
            />
          </div>
        </div>
        <div class="input-group col-md-6 col-lg-6 mb-1">
          <div class="input-group-prepend">
            <span class="input-group-text">Busca por Nome</span>
          </div>
          <input
            type="text"
            id="nome"
            v-model="nomeCompleto"
            class="form-control"
            :placeholder="'Ex: Clodoaldo da Silva'"
          >
          <div id="lixeira">
            <i class="fa fa-trash-o" @click="apagaNome" aria-hidden="true"></i>
          </div>
        </div>
        <div class="input-group col-lg-3 col-sm-5 ml-auto mb-1">
          <div class="input-group-prepend">
            <span class="input-group-text">Por página</span>
          </div>
          <input
            type="text"
            id="porPagina"
            v-model="page.size"
            @blur="buscarLista"
            class="form-control"
            v-mask="'##'"
            :placeholder="page.size"
          >
        </div>
      </div>

      <div class="row justify-content-center col-lg-12">
        <Loader class="mt-5 mb-5" v-show="carregando"/>
        <table v-show="!carregando" class="table table-hover">
          <thead>
            <tr>
              <th
                scope="col"
                v-for="candidato in camposTabela"
                v-bind:key="candidato.id"
              >{{ candidato }}</th>
            </tr>
          </thead>
          <tbody>
            <RowCandidato
              v-for="candidato in candidatos"
              v-bind:key="candidato.id"
              :candidato="candidato"
              :funcAprova="aprova"
              :funcReprova="reprova"
              :buscarLista="buscarLista"
            />
          </tbody>
        </table>
      </div>
      <div class="row justify-content-end">
        <span class="mr-4">Total de Candidatos: {{ page.totalElements }}</span>
        <nav aria-label="...">
          <ul class="pagination">
            <li class="page-item" v-bind:class="{ 'disabled' : page.first }">
              <ButtonNormal class="page-link" texto="Anterior" :onClick="onPreviousPage"/>
            </li>
            <li
              v-for="(p, index) in page.totalPages"
              :key="index"
              class="page-item"
              v-bind:class="{ 'active' : index == page.number }"
            >
              <button class="page-link" @click="goToPage(p)">{{ p }}</button>
            </li>
            <li class="page-item" v-bind:class="{ 'disabled' : page.last }">
              <ButtonNormal class="page-link" texto="Próxima" :onClick="onNextPage"/>
            </li>
          </ul>
        </nav>
      </div>
      <!-- end row -->
    </div>
    <!-- end container -->
  </div>
</template>

<script>
import BackEndApi from "../../api/backEndApi.js";
import ButtonNormal from "../shared/ButtonNormal.vue";
import Candidato from "../../models/candidato.js";
import RowCandidato from "../shared/RowCandidato.vue";
import Loader from "../shared/Loader.vue";

export default {
  name: "TableCandidato",
  components: {
    RowCandidato,
    ButtonNormal,
    Loader
  },
  props: {},
  data() {
    return {
      btnPrev: "Previous",
      btnNext: "Next",
      camposTabela: {
        nome: "Nome",
        nota: "Nota Parcial",
        email: "E-mail",
        dataInscricao: "Data de Inscrição",
        status: "Status",
        botoes: " "
      },
      page: {
        totalPages: 0,
        totalElements: 0,
        last: true,
        first: true,
        size: 20,
        number: 0, //pagina atual
        orderBy: "id",
        orderType: "desc"
      },
      candidatos: [],
      dataInicio: "",
      dataFim: "",
      etapas: [
        { nome: "Pré-seleção", id: 1, cod: "PRE_SELECAO" },
        { nome: "Processo seletivo", id: 2, cod: "PROCESSO_SELETIVO" },
        { nome: "Selecionados", id: 3, cod: "SELECIONADO" }
      ],
      edicoes: [],
      etapaSelecionada: {},
      edicaoSelecionada: {},
      textoEdicoes: "Editar edição",
      textoAddEdicoes: "Adicionar edição",
      ranking: false,
      nomeCompleto: "",
      carregando: false
    };
  },
  methods: {
    async onNextPage() {
      this.page.number += 1;
      await this.buscarLista();
    },
    async onPreviousPage() {
      this.page.number -= 1;
      await this.buscarLista();
    },
    async goToPage(number) {
      this.page.number = number - 1;
      await this.buscarLista();
    },
    async aprova(id) {
      const api = new BackEndApi();
      const candidatoDto = new Candidato();
      candidatoDto.id = id;
      candidatoDto.status = "CONVITE_ENVIADO";
      const result = await api.feedBackCandidato(candidatoDto);
      if (result.error) {
        this.$refs.popupError.errorTitle =
          "Não foi possível realizar a operação";
        this.$refs.popupError.errorMsg =
          "Ocorreu um erro ao tentar enviar o convite para o candidato!";
        this.$refs.popupError.show = true;
        return;
      }
      await this.buscarLista();
    },
    async reprova(id) {
      const api = new BackEndApi();
      const candidatoDto = new Candidato();
      candidatoDto.id = id;
      candidatoDto.status = "REJEITADA";
      const result = await api.feedBackCandidato(candidatoDto);
      if (result.error) {
        this.$refs.popupError.errorTitle =
          "Não foi possível realizar a operação";
        this.$refs.popupError.errorMsg =
          "Ocorreu um erro ao tentar rejeitar o candidato!";
        this.$refs.popupError.show = true;
        return;
      }
      await this.buscarLista();
    },
    async buscarLista() {
      this.carregando = true;
      const api = new BackEndApi();
      var json = "";
      if (this.edicoes.length > 0) {
        if (this.etapaSelecionada == "Todas") {
          json = await api.listarPorEdicaoInteira(
            this.page,
            this.edicaoSelecionada.id,
            this.nomeCompleto
          );
        } else {
          json = await api.listar(
            this.page,
            this.edicaoSelecionada.id,
            this.etapaSelecionada.cod,
            this.nomeCompleto
          );
        }
        if (json.error) {
          this.$refs.popupError.errorTitle =
            "Não foi possível realizar a operação";
          this.$refs.popupError.errorMsg =
            "Ocorreu um erro ao tentar buscar lista de candidatos!";
          this.$refs.popupError.show = true;
          return;
        }
      }
      this.setPageJson(json);
      this.candidatos = json.content;
      this.carregando = false;
    },
    async buscarListaDate() {
      const api = new BackEndApi();

      const json = await api.listarSearchDate(
        this.page,
        this.dataInicio,
        this.dataFim
      );

      if (json.error) {
        this.$refs.popupError.errorTitle =
          "Não foi possível realizar a operação";
        this.$refs.popupError.errorMsg =
          "Verifique se você preencheu corretamente as datas de inicio e fim.";
        this.$refs.popupError.show = true;
        return;
      }

      this.setPageJson(json);
      this.candidatos = json.content;
    },
    setPageJson(json) {
      if (json === "") {
        this.page.totalPages = 0;
        this.page.totalElements = 0;
        this.page.last = true;
        this.page.first = true;
        this.page.size = 20;
        this.page.number = 0;
      } else {
        this.page.totalPages = json.totalPages;
        this.page.totalElements = json.totalElements;
        this.page.last = json.last;
        this.page.first = json.first;
        this.page.size = json.size;
        this.page.number = json.number;
      }
    },
    async buscarEdicoes() {
      const api = new BackEndApi();
      this.edicoes = await api.buscarEdicoes();
    },
    async editarEdicao() {
      this.$router.push({
        name: "EditarEdicao",
        params: { edicao: this.edicaoSelecionada }
      });
    },
    async adicionarEdicao() {
      this.$router.push({ name: "CadastroEdicao" });
    },
    async apagaNome() {
      this.nomeCompleto = "";
    }
  },
  async mounted() {
    Promise.all([this.buscarEdicoes()]).then(j => {
      this.edicaoSelecionada = this.edicoes[this.edicoes.length - 1];
      this.etapaSelecionada = "Todas";
      this.buscarLista();
    });
  },
  watch: {
    edicaoSelecionada: function() {
      this.buscarLista();
      this.page.number = 0;
    },
    etapaSelecionada: function() {
      this.buscarLista();
      this.page.number = 0;
    },
    ranking: function() {
      if (this.page.orderBy == "id") {
        this.page.orderBy = "notasNotaFinal";
      } else {
        this.page.orderBy = "id";
      }
      this.buscarLista();
    },
    nomeCompleto: function() {
      this.buscarLista();
      this.page.number = 0;
    }
  }
};
</script>

<style>
#lixeira {
  padding-left: 0.6rem;
  padding-top: 0.4rem;
}

#linhaDois {
  padding-top: 0.5rem;
}

#espacoDiv {
  padding-left: 1rem;
}

#btnEdicao {
  padding-top: 1rem;
}

.etapas {
  width: 150px;
}

.ranking {
  padding-top: 0.5rem;
  padding-left: 1rem;
}

.fa-trash-o {
  color: rgba(0, 129, 255, 0.5);
}

.fa-trash-o:hover {
  color: #0069d9;
  cursor: pointer;
}
</style>
