<template>
  <section class="container-fluid p-5 chamadaFinal">
    <div class="d-flex text-center h-100">
      <div class="my-auto w-100 text-white">
        <h4 class="mb-5" id="textoChamadaFinal">Não perca a chance de alavancar sua carreira!</h4>
        <Button
          class="btn-lg"
          v-bind:onClick="cadastro"
          v-bind:inscricao="inscricaoEstado"
          v-if="buttonLoaded"
          type="submit"
        />
      </div>
    </div>
  </section>
</template>

<script>
import Button from "../Button.vue";
import BackEndApi from "../../../api/backEndApi.js";

export default {
  name: "ChamadaFinal",
  components: { Button, BackEndApi },
  data: () => {
    return { 
      inscricao: { aberta: true, fechada: false },
      inscricaoEstado: false,
      buttonLoaded: false
    }
  },
  methods: {
    cadastro(){
      this.$router.push({ name: 'Cadastro' })
    }
  },
  async created(){
      const api = new BackEndApi();
      const response = await api.verificaInscricoesAbertas();
      try {
        if(response.error || response.aberta === false){
          this.inscricaoEstado = this.inscricao.fechada
        }else{
          this.inscricaoEstado = this.inscricao.aberta
        }
      } catch (err) {
      } finally{
        this.buttonLoaded = true;
      }
    }
};
</script>

