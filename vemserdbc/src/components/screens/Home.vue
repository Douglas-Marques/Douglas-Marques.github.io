<template>
  <section class="container-fluid p-0">
    <Header v-bind:click="backToTop"/>

    <VideoHeader class="sectionTotScreen"/>

    <OQueE class="sectionTotScreen"/>

    <PreRequisitos class="sectionTotScreen"/>

    <ProcessoSelecao id="cronograma" class="sectionTotScreen"/>

    <Cronograma/>

    <Conteudo id="conteudo" class="sectionTotScreen"/>

    <Depoimentos id="depoimentos" class="sectionTotScreen"/>

    <Beneficios class="sectionTotScreen"/>

    <GMapa :dbc="dbcEndereco" class="sectionTotScreen"/>

    <ChamadaFinal/>

    <AcompanharInscricao/>

    <Footer/>

    <button class="goTop" v-if="isVisible" @click="backToTop">
      <i class="fa fa-angle-up" aria-hidden="true"></i>
    </button>
    
  </section>
</template>

<script>
import Header from "../shared/Header.vue";
import Footer from "../shared/Footer.vue";
import Depoimentos from "../shared/home/Depoimentos.vue";
import Conteudo from "../shared/home/Conteudo.vue";
import Cronograma from "../shared/home/Cronograma.vue";
import mapApi from "../../api/mapApi.js";
import Mapa from "../../models/mapa.js";
import GMapa from "../shared/home/GMapa.vue";
import { VueTyper } from "vue-typer";
import PreRequisitos from "../shared/home/PreRequisitos.vue";
import ProcessoSelecao from "../shared/home/ProcessoSelecao.vue";
import OQueE from "../shared/home/OQueE.vue";
import Beneficios from "../shared/home/Beneficios.vue";
import VideoHeader from "../shared/home/VideoHeader.vue";
import ChamadaFinal from "../shared/home/ChamadaFinal.vue";
import AcompanharInscricao from "../shared/home/AcompanharInscricao.vue";

export default {
  name: "Home",
  components: {
    Beneficios,
    Header,
    Depoimentos,
    Footer,
    GMapa,
    VueTyper,
    PreRequisitos,
    ProcessoSelecao,
    OQueE,
    Conteudo,
    Cronograma,
    VideoHeader,
    ChamadaFinal,
    AcompanharInscricao
  },
  data: () => {
    return {
      textoBotao: "Entrar",
      isVisible: false,
      dbcEndereco: { lat: -30.01627162, lng: -51.16863549 }
    };
  },
  methods: {
    login() {
      this.$router.push({ name: "Login" });
    },
    cadastro() {
      window.location.href = "https://dbc.compleo.com.br/Visualizar/27899";
    },
    toTopButton() {
      $(document).bind(
        "scroll",
        function() {
          var backToTopButton = $(".goTop");
          if ($(document).scrollTop() > 450) {
            backToTopButton.addClass("isVisible");
            this.isVisible = true;
          } else {
            backToTopButton.removeClass("isVisible");
            this.isVisible = false;
          }
        }.bind(this)
      );
    },
    backToTop() {
      $("html,body")
        .stop()
        .animate(
          {
            scrollTop: 0
          },
          "slow",
          "swing"
        );
    }
  },
  mounted: function() {
    this.$nextTick(function() {
      this.toTopButton();
    });
  }
};

$(document).ready(function() {
  $(".nav-link").click(function() {
    $("html, body").animate(
      {
        scrollTop: $($(this).attr("href")).offset().top - 50
      },
      500
    );
    return false;
  });
});
</script>

<style>
@import url("https://fonts.googleapis.com/css?family=Sarala");

* {
  font-family: "Sarala", "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
.vue-typer .custom.char {
  color: #e8eaed;
}

#conteudoContainerChamada {
  padding-top: 5rem;
  padding-bottom: 4vh;
}

#textoChamadaFinal {
  font-size: 2.5rem;
}

#destaqueChamada {
  font-size: 3.5em;
}

#subtituloChamada {
  font-size: 1.5rem;
  padding-top: 0.5rem;
  font-weight: lighter;
}

#imgRadius {
  border-radius: 10px;
}

@media (max-width: 767.98px) {
  #destaqueChamada {
    font-size: 2rem;
    display: block;
  }

  #textoChamadaFinal {
    font-size: 2rem;
  }
}

.goTop {
  border-radius: 25px;
  background-color: #010e1b;
  background-color: rgba(1, 14, 27, 0.7);
  position: fixed;
  width: 45px;
  height: 45px;
  display: block;
  right: 15px;
  bottom: 15px;
  border: none;
  opacity: 0;
  z-index: -1;
  cursor: pointer;
}

.goTop .fa {
  color: white;
  font-size: 22px;
}

.goTop:hover {
  opacity: 1;
  background-color: #010e1b;
  background-color: rgba(1, 14, 27, 0.9);
}

.isVisible {
  opacity: 0.8;
  z-index: 4;
  transition: all 0.4s ease-in;
}

.redonda {
  width: 460px;
  height: 300px;
}

.chamadaFinal {
  background-image: url("../../assets/fundo-chamada-final.png");
  background-color: #e8eaed;
  height: 20rem;
  background-attachment: fixed;
  background-size: cover;
}

.sectionTotScreen {
  min-height: 100vh;
  display: flex;
  align-items: center;
}
</style>
