<template>
  <!-- Modal -->
  <div
    class="modal fade"
    :id="id"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalCenterTitle"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered max-width-600px" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalCenterTitle">{{ candidato.nomeCompleto }}</h5>
          <div class="ml-auto">
            <button
              v-if="candidato.etapa == 'PRE_SELECAO' || candidato.status == 'REJEITADA'"
              class="btn btn-primary btn-sm m-2"
              data-dismiss="modal"
              @click="funcAprova();"
            >
              <LoaderButton v-if="loaderAprova"/>
              <span v-else>Aprovar</span>
            </button>
            <button
              v-else-if="candidato.etapa == 'PROCESSO_SELETIVO'"
              class="btn btn-primary btn-sm m-2"
              data-dismiss="modal"
              @click="funcAprova()"
            >
              <LoaderButton v-if="loaderAprova"/>
              <span v-else>Selecionar</span>
            </button>
            
            <button
              v-if="candidato.status == 'REJEITADA' "
              class="btn btn-outline-danger btn-sm m-2"
              data-dismiss="modal"
              v-bind:disabled="true"
              @click="funcReprova()"
            >
              <LoaderButton v-if="loaderReprova"/>
              <span v-else>Reprovar</span>
            </button>
            <button
              v-else
              class="btn btn-outline-danger btn-sm m-2"
              data-dismiss="modal"
              @click="funcReprova()"
            >
              <LoaderButton v-if="loaderReprova"/>
              <span v-else>Reprovar</span>
            </button>
          </div>
        </div>
        <div class="modal-body">
          <div class="container-fluid">
            <div class="row">
              <div class="col-sm-6">
                <a :href="candidato.curriculo" target="_blank">
                  <button class="btn btn-outline-succes btn m-2">
                    <img height="20px" src="../../assets/pdfIcon.png">
                    Currículo download
                  </button>
                </a>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-sm-4">
                <h6>CPF:</h6>
                <p class="resposta">
                  <i class="fa fa-whatsapp" aria-hidden="true"></i>
                  {{ candidato.cpf }}
                </p>
              </div>
              <div class="col-sm-4">
                <h6>Nascimento:</h6>
                <p class="resposta">{{ candidato.dataNascimento }}</p>
              </div>
              <div class="col-sm-4">
                <h6>Celular:</h6>
                <a
                  target="_blank"
                  :href="'https://api.whatsapp.com/send?phone=55'+this.candidato.celular.replace(/\(|\)/g,'')"
                >
                  <p class="resposta">{{ candidato.celular }}</p>
                </a>
              </div>
            </div>
            <div class="row mt-2">
              <div class="col-sm-8">
                <h6>E-mail:</h6>
                <p class="resposta">{{ candidato.email }}</p>
              </div>
              <div class="col-sm-4">
                <h6>Telefone:</h6>
                <p class="resposta">{{ candidato.telefone }}</p>
              </div>
            </div>
            <div class="row mt-1">
              <div class="col-sm-12">
                <h6>Rua:</h6>
                <p
                  class="resposta"
                >{{ candidato.endereco.logradouro }}, {{ candidato.endereco.numero }}</p>
              </div>
            </div>
            <div v-if="candidato.endereco.complemento" class="row mt-2">
              <div class="col-sm-6">
                <h6>Complemento:</h6>
                <p class="resposta">{{ candidato.endereco.complemento }}</p>
              </div>
              <div class="col-sm-6">
                <h6>Cep:</h6>
                <p class="resposta">{{ candidato.endereco.cep }}</p>
              </div>
            </div>
            <div class="row mt-3">
              <div class="col-sm-4">
                <h6>Bairro:</h6>
                <p class="resposta">{{ candidato.endereco.bairro }}</p>
              </div>
              <div class="col-sm-4">
                <h6>Cidade:</h6>
                <p class="resposta">{{ candidato.endereco.cidade }}</p>
              </div>
              <div class="col-sm-4">
                <h6>Estado:</h6>
                <p class="resposta">{{ candidato.endereco.estado }}</p>
              </div>
            </div>
            <div v-if="historico.mediasEdicao" id="historico" class="row mt-3">
              <button
                class="btn btn-link collapsed"
                data-toggle="collapse"
                data-target="#collapseOne"
                aria-expanded="true"
                aria-controls="collapseOne"
              >Esse candidato já participou das seguintes edições:</button>
              <div class="col-sm-12">
                <div
                  id="collapseOne"
                  class="collapse"
                  aria-labelledby="headingOne"
                  data-parent="#historico"
                  v-for="media in historico.mediasEdicao"
                  v-bind:key="media.numeroEdicao"
                >
                  <p>Ano: {{media.ano}} - Edição: {{media.numeroEdicao}} - Média final: {{media.notaFinal}}</p>
                </div>
              </div>
            </div>
            <div id="questionario">
              <h2 class="titulo">Questionário</h2>
              <div class="row mt-2">
                <div class="col-sm-6">
                  <h6>1 - Está matriculado em curso relacionado a TI?</h6>
                  <p class="resposta">{{ candidato.questionario.matriculadoEmCurso ? "Sim":"Não" }}</p>
                </div>
                <div class="col-sm-6">
                  <h6>2 - Qual o curso?</h6>
                  <p class="resposta">{{ candidato.questionario.curso }}</p>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-sm-6">
                  <h6>3 - Em qual instituição de ensino está estudando?</h6>
                  <p class="resposta">{{ candidato.questionario.instituicao }}</p>
                </div>
                <div class="col-sm-6">
                  <h6>4 - Em que turno está matriculado?</h6>
                  <p class="resposta">{{ candidato.questionario.turnos }}</p>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-sm-6">
                  <h6>5 - Selecione os motivos pelo qual se interessou pela carreira na área de tecnologia</h6>
                  <p class="resposta">{{ candidato.questionario.motivo }}</p>
                </div>
                <div class="col-sm-6">
                  <h6>6 - Tens conhecimento em lógica de programação?</h6>
                  <p
                    class="resposta"
                  >{{ candidato.questionario.conhecimentoEmLogica ? "Sim":"Não" }}</p>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-sm-6">
                  <h6>7 - Tens disponibilidade de horários?</h6>
                  <p
                    class="resposta"
                  >{{ candidato.questionario.disponibilidadeDeHorario ? "Sim":"Não" }}</p>
                </div>
                <div class="col-sm-6">
                  <h6>8 - Tens interesse e disponibilidade para trabalhar em turno integral?</h6>
                  <p
                    class="resposta"
                  >{{ candidato.questionario.disponibilidadeAposEstagio ? "Sim":"Não" }}</p>
                </div>
              </div>
              <div class="row mt-2">
                <div class="col-sm-6">
                  <h6>9 - Nos conte o que te inspira e motiva a fazer parte do programa de formação Vem Ser DBC</h6>
                  <p class="resposta">{{ candidato.questionario.inspiracao }}</p>
                </div>
                <div class="col-sm-6">
                  <h6>10 - Pessoas importantes pra você.</h6>
                  <p class="resposta">{{ candidato.questionario.referencias }}</p>
                </div>
              </div>
            </div>
            <div id="notas">
              <form id="formData" v-on:submit.prevent="noop">
                <h2 class="titulo">Notas</h2>
                <div class="row mt-3">
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>Questionário</label>
                      <input
                        type="text"
                        class="form-control"
                        v-validate="'max_value:10'"
                        v-mask="'##.##'"
                        v-bind:name="'Questionario'"
                        v-model="candidato.notas.preSelecao"
                      >
                      <span class="text-danger">{{errors.first("Questionario")}}</span>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>TIG</label>
                      <input
                        type="text"
                        class="form-control"
                        v-validate="'max_value:10'"
                        v-mask="'##.##'"
                        v-bind:name="'TIG'"
                        v-model="candidato.notas.tig"
                      >
                      <span class="text-danger">{{errors.first("TIG")}}</span>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>AC</label>
                      <input
                        type="text"
                        class="form-control"
                        v-validate="'max_value:10'"
                        v-mask="'##.##'"
                        v-bind:name="'AC'"
                        v-model="candidato.notas.ac"
                      >
                      <span class="text-danger">{{errors.first("AC")}}</span>
                    </div>
                  </div>
                </div>
                <div class="row mt-3">
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>Lógica de Program.</label>
                      <input
                        type="text"
                        class="form-control"
                        v-validate="'max_value:10'"
                        v-mask="'##.##'"
                        v-bind:name="'Logica de Programacao'"
                        v-model="candidato.notas.logicaProgramacao"
                      >
                      <span class="text-danger">{{errors.first("Logica de Programacao")}}</span>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>Nota do facilitador</label>
                      <input
                        type="text"
                        class="form-control"
                        v-validate="'max_value:10'"
                        v-mask="'##.##'"
                        v-bind:name="'Nota do facilitador'"
                        v-model="candidato.notas.entrevistaFacilitador"
                      >
                      <span class="text-danger">{{errors.first("Nota do facilitador")}}</span>
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <div class="form-group">
                      <label>Nota do RH</label>
                      <input
                        type="text"
                        class="form-control"
                        v-validate="'max_value:10'"
                        v-mask="'##.##'"
                        v-bind:name="'Nota do RH'"
                        v-model="candidato.notas.entrevistaRh"
                      >
                      <span class="text-danger">{{errors.first("Nota do RH")}}</span>
                    </div>
                  </div>
                </div>
                <ButtonNormal
                  class="btn float-right"
                  v-bind:onClick="onSubmitNotas"
                  v-bind:texto="'Salvar notas'"
                  :disabled="!isFormValid||abc"
                />
              </form>
            </div>
            <Comentario :nome="candidato.comentario" :onSubmitComentario="onSubmitComentario"/>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>
    </div>
    <PopUp :show="popupShow" :loading="popupLoading" :error="popupError"/>
  </div>
</template>

<script>
import LoaderButton from "../shared/LoaderButton.vue";
import PopUp from "../shared/PopUp.vue";
import ButtonNormal from "../shared/ButtonNormal.vue";
import BackEndApi from "../../api/backEndApi.js";
import Comentario from "./Comentario.vue";

export default {
  name: "PopupCandidatoInfo",
  components: {
    LoaderButton,
    PopUp,
    ButtonNormal,
    Comentario
  },
  data: () => {
    return {
      notas: {},
      popupLoading: true,
      popupShow: false,
      popupError: false,
      historico: undefined
    };
  },
  props: {
    id: String,
    candidato: Object,
    funcAprova: Function,
    funcReprova: Function,
    loaderAprova: Boolean,
    loaderReprova: Boolean,
    buscarLista: Function
  },
  methods: {
    noop() {},
    showPopup(response) {
      if (!response.error) {
        this.popupLoading = false;
        setTimeout(() => {
          this.popupShow = false;
          this.popupLoading = true;
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
    async onSubmitNotas() {
      this.popupShow = true;
      const api = new BackEndApi();
      const response = await api.cadastrarNotas(this.candidato.notas);
      this.showPopup(response);
      this.buscarLista();
    },
    async onSubmitComentario(comentario) {
      this.popupShow = true;
      const api = new BackEndApi();
      const response = await api.adicionarComentario(
        comentario,
        this.candidato.id
      );
      this.showPopup(response);
    }
  },
  computed: {
    isFormValid() {
      return !Object.keys(this.fields).some(key => this.fields[key].invalid);
    }
  },
  async created() {
    const api = new BackEndApi();
    this.historico = await api.verificaHistorico(this.candidato.cpf);
  }
};
</script>

<style>
.max-width-600px {
  max-width: 600px !important;
}

.titulo {
  text-align: center;
  margin-top: 3rem;
}

.resposta {
  color: rgb(6, 120, 173);
  word-wrap: break-word;
}

.modal {
  cursor: default !important;
}
</style>
