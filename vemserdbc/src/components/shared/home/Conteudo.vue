<template>
  <section id="tecnologias" class="sectionTotScreen container-fluid bg-white">
    <div class="container align-self-center">
      <div class="row">
        <div class="col-12 text-center">
          <h1>Conteúdo</h1>
        </div>
        <div class="col-12 text-center mt-5 mb-4">
          <p
            class="font-weight-light h2"
          >Aprenda a trabalhar com tecnologias atuais e de grande demanda do mercado.</p>
        </div>
      </div>
      <div class="row mt-3">
        <Topico v-for="topico in topicos" :key="topico.img" :texto="topico.txt" :img="topico.img"/>
      </div>
    </div>
  </section>
</template>

<script>
import Topico from "../Topico.vue";

export default {
  name: "Conteudo",
  components: { Topico },
  data: () => {
    return {
      topicos: [
        {
          img: require("../../../assets/tecnologias/java_logo.png"),
          txt:
            "Conceitos sobre Orientação a Objetos com aplicação na linguagem Java."
        },
        {
          img: require("../../../assets/tecnologias/html_css_logo.png"),
          txt: "Introdução Web Front End HTML, CSS e aplicação de bibliotecas."
        },
        {
          img: require("../../../assets/tecnologias/javascript_logo.png"),
          txt:
            "Desenvolvimento Javascript com destaque para frameworks da linguagem."
        },
        {
          img: require("../../../assets/tecnologias/spring_logo.png"),
          txt:
            "Back-End Spring com conexão a banco de dados Oracle SQL e aplicação de bibliotecas e frameworks."
        }
      ]
    };
  }
};
</script>

<style>
.js-ajuste {
  padding-right: 2.5rem;
}
</style>
