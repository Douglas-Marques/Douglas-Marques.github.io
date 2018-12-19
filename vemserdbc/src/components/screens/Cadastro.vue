<template>
  <section class="container-fuild p-3 m-0 gradiente">
    <div class="container">
      <div class="row m-3">
        <div class="col-4 col-sm-3 col-md-2 mr-auto bg-white shadow-lg p-2">
          <h5 class="text-center" id="txtVoltar">
            <router-link :to="{ name: 'Home'}">Voltar</router-link>
          </h5>
        </div>
      </div>
      <div class="row justify-content-center shadow-lg m-2 p-4 bg-white">
        <div class="col-12">
          <form id="formData" v-on:submit.prevent="onSubmit">
            <!-- Nome -->
            <InputForm
              nome="nomeCompleto"
              label="Nome Completo"
              rules="required"
              placeholder="Exemplo: João da Silva"
              ref="nomeCompleto"
            />

            <!-- Data de nascimento: -->
            <InputForm
              nome="dataNascimento"
              label="Data de nascimento"
              rules="required"
              :mask="'##/##/####'"
              placeholder="Ex: 01/01/1990"
              ref="dataNascimento"
            />

            <EmailInput nome="emailName" :funcao="verificaEmailExistente" ref="email"/>
            <span class="text-danger" v-show="!campoEmailValido">{{erroEmail}}</span>
            <!-- CPF -->
            <div class="form-group">
              <label for="cpf">CPF:</label>
              <input
                type="text"
                id="cpf"
                name="cpf"
                v-model="CPF"
                class="form-control"
                v-on:change="verificaCPFExistente"
                v-mask="'###.###.###-##'"
                placeholder="Ex: 000.000.000-00"
              >
              <span class="text-danger" v-show="!campoCpfValido">{{erroCPF}}</span>
            </div>
            <!-- CEP -->
            <div class="form-group">
              <label for="campoCep">Cep:</label>
              <input
                type="text"
                id="campoCep"
                name="cep"
                v-model="cep"
                class="form-control"
                v-validate="{ required: true, regex: /^\d{5}-\d{3}$/ }"
                v-on:change="buscarCep"
                v-mask="'#####-###'"
                placeholder="Ex: 91000-000"
              >
              <span class="text-danger">{{errors.first('cep')}}</span>
            </div>

            <!-- Endereco -->
            <InputForm
              nome="logradouro"
              label="Logradouro"
              rules="required"
              placeholder="Ex: Rua Andaraí"
              ref="logradouro"
            />

            <InputForm
              nome="numero"
              label="Numero"
              rules="required"
              placeholder="Ex: 531"
              ref="numero"
            />

            <InputForm
              nome="complemento"
              label="Complemento"
              placeholder="Ex: Ap 308"
              ref="complemento"
            />

            <InputForm
              nome="bairro"
              label="Bairro"
              rules="required"
              placeholder="Ex: Centro"
              ref="bairro"
            />

            <InputForm
              nome="cidade"
              label="Cidade"
              rules="required"
              placeholder="Ex: Porto Alegre"
              ref="cidade"
            />

            <InputForm
              nome="estado"
              label="Estado"
              rules="required"
              placeholder="Ex: Rio Grande do Sul"
              ref="estado"
            />
            <!-- Telefone -->
            <InputForm
              nome="telefone"
              label="Telefone"
              rules="required|max:15|min:12"
              :mask="'(##) ########?#'"
              placeholder="Ex: (51) 987654123 ou (51) 32109874"
              ref="telefone"
            />
            <!-- Celular -->
            <InputForm
              nome="celular"
              label="Celular"
              rules="required|max:15|min:12"
              :mask="'(##) ########?#'"
              placeholder="Ex: (51) 982109874"
              ref="celular"
            />
            <!-- Institucao de Ensino -->
            <InputForm
              nome="instituicao"
              label="Instituicao de Ensino"
              rules="required"
              placeholder="Ex: UFRGS ou PUCRS"
              ref="instituicao"
            />
            <!-- Carregamento do curriculo PDF -->
            <div class="form-group">
              <label for="campoCurriculo">Curriculo (Somente .pdf):</label>
              <input
                type="file"
                id="campoCurriculo"
                name="curriculo"
                class="form-control"
                v-validate="'required|ext:pdf'"
                data-vv-as="curriculo"
                placeholder="Ex: meuCurriculo.pdf"
                @change="convertFile"
                ref="arquivos"
              >
              <span class="text-danger">{{errors.first('curriculo')}}</span>
            </div>

            <h1 class="titulo-questionario">QUESTIONÁRIO</h1>

            <div class="form-group" id="questao1">
              <label for="questao1">1 - Está matriculado em curso relacionado a TI?</label>
              <div class="questao1">
                <input
                  v-validate="'required|included:true,false'"
                  name="matriculado"
                  type="radio"
                  id="questao1resposta1"
                  value="true"
                  v-model="matriculado"
                  checked
                >
                Sim
                <input
                  type="radio"
                  id="questao1resposta2"
                  value="false"
                  v-model="matriculado"
                  checked
                > Não
              </div>
              <span class="text-danger">{{errors.first( "matriculado" )}}</span>
            </div>

            <InputForm
              nome="curso"
              label="2 - Se sua resposta foi 'Sim', qual o curso?"
              rules="required"
              placeholder="Ex: Ciência da Computação"
              ref="curso"
            />

            <div class="form-group">
              <label for="questao3">3 - Em que turno está matriculado?</label>
              <div class="questao3">
                <div class="form-group check">
                  <input
                    type="checkbox"
                    id="manha"
                    name="turno"
                    value="manha"
                    v-validate="'required|included:manha,tarde,noite'"
                    v-model="turnos"
                  >
                  <label for="manha">Manhã</label>
                </div>
                <div class="form-group check">
                  <input type="checkbox" id="tarde" name="tarde" value="tarde" v-model="turnos">
                  <label for="tarde">Tarde</label>
                </div>
                <div class="form-group check">
                  <input type="checkbox" id="noite" name="noite" value="noite" v-model="turnos">
                  <label for="noite">Noite</label>
                </div>
              </div>
              <span class="text-danger">{{errors.first( "turno" )}}</span>
            </div>

            <div class="form-group" id="questao4">
              <label
                for="questao4"
              >4 - Selecione os motivos pelo qual se interessou pela carreira na área de tecnologia:</label>
              <div class="questao4">
                <div class="form-group">
                  <input
                    name="interesse"
                    type="radio"
                    value="por gostar de resolver problemas"
                    v-model="interesse"
                    id="opcao1"
                    :v-validate="'required|included:por gostar de desafios,por ajudar pessoas,pelo reconhecimento e valorização financeira do profissional de ti,'+interesseTexto"
                    checked
                  >
                  <label for="opcao1">Por gostar de resolver problemas</label>
                </div>
                <div class="form-group">
                  <input
                    type="radio"
                    value="por gostar de desafios"
                    v-model="interesse"
                    id="opcao2"
                  >
                  <label for="opcao2">Por gostar de desafios</label>
                </div>
                <div class="form-group">
                  <input type="radio" value="por ajudar pessoas" v-model="interesse" id="opcao3">
                  <label for="opcao3"></label>Por ajudar pessoas
                </div>
                <div class="form-group">
                  <input
                    type="radio"
                    value="pelo reconhecimento e valorização financeira do profissional de ti"
                    v-model="interesse"
                    id="opcao4"
                  >
                  <label
                    for="opcao4"
                  >Pelo reconhecimento e valorização financeira do profissional de ti</label>
                </div>
                <div class="form-group">
                  <input type="radio" v-model="interesse" id="opcao5">
                  <label for="opcao5">Outro</label>
                  <textarea class="form-control" v-model="interesseTexto" rows="7" cols="100"></textarea>
                </div>
                <span class="text-danger">{{errors.first( "interesse" )}}</span>
              </div>
            </div>

            <div class="form-group" id="questao5">
              <label
                for="questao5"
              >5 - Uma das nossas etapas eliminatórias de seleção será uma prova de lógica de programação, não sendo necessária a realização em tecnologia específica, mas será avaliado o raciocínio para solução de problemas. Tens conhecimento em lógica de programação?</label>
              <input
                type="radio"
                value="true"
                name="lógica"
                v-model="logica"
                id="questao5opcao1"
                v-validate="'required|included:true,false'"
              >
              <label for="questao5opcao1">Sim</label>
              <input type="radio" value="false" v-model="logica" id="questao5opcao2">
              <label for="questao5opcao2">Não</label>
              <span class="text-danger">{{errors.first( "lógica" )}}</span>
            </div>

            <div class="form-group" id="questao6">
              <label
                for="questao6"
              >6 - O estágio/capacitação acontecerá no turno da tarde, das 13h30min às 17h30min, de segunda a sexta-feira e será necessária muita dedicação extra para as atividades. Tens disponibilidade de horários?</label>
              <input
                type="radio"
                value="true"
                name="diponibilidade"
                v-model="disponibilidadeHorario"
                id="questao6opcao1"
                v-validate="'required|included:true,false'"
              >
              <label for="questao6opcao1">Sim</label>
              <input
                type="radio"
                value="false"
                v-model="disponibilidadeHorario"
                id="questao6opcao2"
              >
              <label for="questao6opcao2">Não</label>
              <span class="text-danger">{{errors.first( "diponibilidade" )}}</span>
            </div>

            <div class="form-group" id="questao7">
              <label
                for="questao7"
              >7 - A turma terá 14 alunos. O interesse da DBC é efetivar os estudantes que performarem bem após a capacitação. Tens interesse e disponibilidade para trabalhar em turno integral (manhã e tarde, 44h semanais), após o estágio, caso aprovado?</label>
              <input
                type="radio"
                value="true"
                name="horario"
                v-model="disponibilidadeEfetivacao"
                id="questao7opcao1"
                v-validate="'required|included:true,false'"
              >
              <label for="questao7opcao1">Sim</label>
              <input
                type="radio"
                value="false"
                v-model="disponibilidadeEfetivacao"
                id="questao7opcao2"
              >
              <label for="questao6opcao2">Não</label>
              <span class="text-danger">{{errors.first( "horario" )}}</span>
            </div>

            <div class="form-group" id="questao8">
              <label
                for="questao8"
              >8 - Nos conte o que te inspira e motiva a fazer parte do programa de formação Vem Ser DBC:</label>
              <textarea
                v-validate="'required'"
                name="inspiração"
                class="form-control"
                v-model="inspira"
                rows="7"
                cols="100"
              ></textarea>
              <span class="text-danger">{{errors.first( "inspiração" )}}</span>
            </div>

            <div class="form-group" id="questao9">
              <label
                for="questao9"
              >9 - Quais são as suas referências de pessoas que você acompanha ou que o inspiram? Quais ideias elas defendem que você se identifica e considera importantes? Aqui, você pode falar de pensadores, artistas, escritores, atletas ou quaisquer pessoas importantes pra você.</label>
              <textarea
                v-validate="'required'"
                class="form-control"
                name="referencia"
                v-model="referencia"
                rows="7"
                cols="100"
              ></textarea>
              <span class="text-danger">{{errors.first( "referencia" )}}</span>
            </div>

            <ButtonNormal
              class="btn-lg"
              v-bind:onClick="noop"
              :disabled="!isFormValid"
              v-bind:texto="textoBotao"
              type="submit"
            />
          </form>
        </div>
        <!-- End col  -->
      </div>
      <!-- End row  -->
      <PopUpCadastro :show="popupShow" :loading="popupLoading" :error="popupError"/>
    </div>
    <!-- End container  -->
  </section>
</template>

<script>
import ButtonNormal from "../shared/ButtonNormal.vue";
import EmailInput from "../shared/EmailInput.vue";
import InputForm from "../shared/InputForm.vue";
import PopUpCadastro from "../shared/PopUpCadastro.vue";
import CorreiosApi from "../../api/correioApi";
import BackEndApi from "../../api/backEndApi.js";

export default {
  name: "Cadastro",
  components: {
    ButtonNormal,
    EmailInput,
    InputForm,
    PopUpCadastro
  },
  data: () => {
    return {
      textoBotao: "Submeter Inscrição",
      cep: "",
      mostra: "",
      CPF: "",
      erroCPF: "",
      erroEmail: "",
      color: "",
      candidato: {},
      arquivoEmBase64: "",
      popupLoading: true,
      popupShow: false,
      popupError: false,
      campoEmailValido: false,
      campoCpfValido: false,
      matriculado: "",
      turnos: [],
      interesse: "",
      logica: "",
      disponibilidadeHorario: "",
      disponibilidadeEfetivacao: "",
      inspira: "",
      referencia: "",
      interesseTexto: ""
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
          this.$router.push({ name: "Home" });
        }, 1500);
      } else {
        this.popupLoading = false;
        this.popupError = true;
        setTimeout(() => {
          this.popupShow = false;
          this.popupLoading = true;
          this.popupError = false;
        }, 3500);
      }
    },

    verifica() {
      /*metodo de verificacao da forca da senha*/
      let senha = this.senha;
      let forca = 0;
      const valor = this.senha;

      if (senha.length >= 4 && senha.length <= 7) {
        forca += 10;
      } else if (senha.length > 7) {
        forca += 25;
      }

      if (senha.length >= 4 && senha.match(/[a-z]+/)) {
        forca += 10;
      }
      if (senha.length >= 4 && senha.match(/[A-Z]+/)) {
        forca += 20;
      }
      if (senha.length >= 4 && senha.match(/d+/)) {
        forca += 20;
      }
      if (senha.length >= 4 && senha.match(/W+/)) {
        forca += 25;
      }

      if (forca === 0) {
        this.mostra = "";
      } else if (forca >= 1 && forca < 30) {
        this.mostra = "Senha Fraca";
        this.color = "text-danger";
      } else if (forca >= 30 && forca < 60) {
        this.mostra = "Senha Media";
        this.color = "text-warning";
      } else if (forca >= 60) {
        this.mostra = "Senha Forte";
        this.color = "text-success";
      }
    },
    async buscarCep() {
      /*metodo que faz a busca do CEP na API*/
      const endereco = new CorreiosApi();
      try {
        this.endUser = await endereco.carregarEndereco(this.cep);
        this.$refs.logradouro.value = this.endUser.logradouro;
        this.$refs.cidade.value = this.endUser.cidade;
        this.$refs.estado.value = this.endUser.estado;
        this.$refs.bairro.value = this.endUser.bairro;
      } catch (err) {
        console.log(err, "Erro ao acessar servidor de endereço.");
      }
    },
    async onSubmit() {
      /*metodo que salva o candidato no banco*/
      this.popupShow = true;
      let interesse_ = interesse;
      if (interesse === "Outro") {
        interesse_ = interesseTexto;
      }
      this.candidato = {
        nomeCompleto: this.$refs.nomeCompleto.value,
        email: this.$refs.email.value,
        nascimento: this.$refs.dataNascimento.value,
        cpf: this.CPF,
        cep: this.cep,
        logradouro: this.$refs.logradouro.value,
        numero: this.$refs.numero.value,
        complemento: this.$refs.complemento.value,
        bairro: this.$refs.bairro.value,
        cidade: this.$refs.cidade.value,
        celular: this.$refs.celular.value,
        estado: this.$refs.estado.value,
        telefone: this.$refs.telefone.value,
        curriculo: this.arquivoEmBase64,
        questionario: {
          matriculadoEmCurso: this.matriculado,
          curso: this.$refs.curso.value,
          instituicao: this.$refs.instituicao.value,
          turnos: this.turnos.toString(),
          motivo: interesse_,
          conhecimentoEmLogica: this.logica,
          disponibilidadeDeHorario: this.disponibilidadeHorario,
          disponibilidadeAposEstagio: this.disponibilidadeEfetivacao,
          inspiracao: this.inspira,
          referencias: this.referencia
        }
      };
      const api = new BackEndApi();
      const response = await api.cadastrarCandidato(this.candidato);
      this.showPopup(response);
    },
    async verificaCPFExistente() {
      /*metodo que verifica no banco se o CPF ja esta cadastrado*/
      const api = new BackEndApi();
      try {
        const response = await api.verificaCPFExistente(
          this.CPF.replace(/\D/g, "")
        );
        if (response.id != null) {
          this.campoCpfValido = false;
          this.erroCPF = "CPF já cadastrado";
        } else {
          this.campoCpfValido = true;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async verificaEmailExistente() {
      const api = new BackEndApi();
      try {
        const response = await api.verificaEmailExistente(
          this.$refs.email.value
        );
        if (response.id != null) {
          this.campoEmailValido = false;
          this.erroEmail = "Endereço de email já cadastrado";
        } else {
          this.campoEmailValido = true;
        }
      } catch (err) {}
    },
    async convertFile() {
      /*metodo que faz a conversao do arquivo .pdf para String*/
      this.arquivoEmBase64 = await this.getFileInBase64();
    },
    async getFileInBase64() {
      /*método que salva o arquivo curriculo com a data de envio */
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(this.$refs.arquivos.files[0]);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });
    }
  },
  computed: {
    isFormValid() {
      return (
        !Object.keys(this.fields).some(key => this.fields[key].invalid) &&
        this.campoEmailValido &&
        this.campoCpfValido
      );
    }
  }
};
</script>
<style>
#txtVoltar {
  padding-right: 0.3rem;
  padding-top: 0.5rem;
}

.gradiente {
  background-image: linear-gradient(
    120deg,
    rgb(53, 208, 88),
    rgb(61, 131, 206)
  );
}

.titulo-questionario {
  margin-top: 2rem;
  text-align: center;
}

#questao1resposta2,
#questao5opcao2,
#questao6opcao2,
#questao7opcao2 {
  margin-left: 3rem;
}

#questao2 {
  margin-left: 2rem;
}

.check {
  display: inline;
  margin-right: 2rem;
}
</style>
