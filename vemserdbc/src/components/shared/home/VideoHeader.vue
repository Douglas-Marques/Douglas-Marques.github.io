<template>
  <section class="sectionTotScreen video-header">
    <div class="overlay"></div>
    <video playsinline="playsinline" autoplay="autoplay" muted="muted" loop="loop">
      <source src="../../../assets/video/Words.mp4" type="video/mp4">
    </video>
    <div class="container h-100">
      <div class="d-flex text-center h-100">
        <div class="my-auto w-100 text-white" id="conteudoContainerChamada">
          <div class="mb-5">
            <h1 id="destaqueChamada">
              <vue-typer
                text="APRENDA. EVOLUA. DESTAQUE-SE."
                :repeat="Infinity"
                :shuffle="false"
                initial-action="typing"
                :pre-type-delay="100"
                :type-delay="200"
                :pre-erase-delay="3000"
                :erase-delay="100"
                erase-style="backspace"
                :erase-on-complete="false"
                caret-animation="phase"
              ></vue-typer>
            </h1>
            <h5
              id="subtituloChamada"
            >Quer fazer parte de um programa de capacitação que formará profissionais nas tecnologias que mais empregam no mercado de trabalho?</h5>
          </div>
          <Button
            class="btn-lg"
            v-bind:onClick="cadastro"
            v-bind:inscricao="inscricaoEstado"
            v-if="buttonLoaded"
            type="submit"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Button from "../Button.vue";
import BackEndApi from "../../../api/backEndApi.js";


export default {
  name: "VideoHeader",
  components: {
    Button, BackEndApi
  },
  data: () => {
    return {
      inscricao: { aberta: true, fechada: false },
      inscricaoEstado: false,
      buttonLoaded: false
    };
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

<style>
.video-header {
  position: relative;
  background-image: url("../../../assets/viedo-snapshot.jpg");
  height: 100vh;
  min-height: 25rem;
  width: 100%;
  overflow: hidden;
}

.video-header video {
  position: absolute;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: 0;
}

.video-header .container {
  position: relative;
  z-index: 2;
}

.video-header .overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    120deg,
    rgba(53, 208, 89, 0.767),
    rgba(61, 131, 206, 0.822)
  );
  background-color: #e8eaed;
  opacity: 0.85;
  z-index: 1;
}

@media (max-width: 767.98px) {
  .video-header video {
    display: none;
    visibility: hidden;
  }

  .video-header {
    position: relative;
    background-image: url("../../../assets/video/Words.jpg");
    height: 100vh;
    min-height: 25rem;
    width: 100%;
    overflow: hidden;
  }
}
</style>
