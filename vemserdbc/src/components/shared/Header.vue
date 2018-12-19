<template>
  <nav
    class="nav navbar navbar-light navbar-expand-lg bg-transparent nav-transparent fixed-top"
    v-bind:style="{ transform: showMenu? 'translate(0)': 'translate(-100%)' }"
  >
    <a class="navbar-brand m-2" @click="click">
      <img src="../../assets/logo-vemser-topo.png">
    </a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo02"
      aria-controls="navbarTogglerDemo02"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse menu-drop" id="navbarTogglerDemo02">
      <ul class="navbar-nav ml-auto mt-2 p-3 mt-lg-0">
        <li class="nav-item">
          <a class="nav-link" href="#oqueeh">O que é?</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#requisitos">Pré-Requisitos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#cronograma">Etapas</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#conteudo">Conteúdo</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#depoimentos">Depoimentos</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#beneficios">Benefícios</a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="#mapa">Onde fica?</a>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import Button from "../shared/Button.vue";

export default {
  name: "Header",
  components: {
    Button
  },
  props: {
    click: Function
  },
  data: () => {
    return {
      textoBotao: "Entrar",
      showMenu: true
    };
  },
  methods: {
    login() {
      this.$router.push({ name: "Login" });
    },
    handleScroll() {
      var nav = $(".navbar");
      $(window).scroll(function() {
        var scroll = $(window).scrollTop();

        if (scroll >= 50) {
          nav
            .removeClass("nav bg-transparent nav-transparent shadow-lg")
            .addClass("nav-alt");
        } else {
          nav
            .removeClass("nav-alt bg-ligth")
            .addClass("nav nav-transparent bg-transparent");
        }
      });
    }
  },
  created() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style>
.nav {
  height: 17vh;
  width: 100%;
  transition: all 0.3s;
}

.nav-alt {
  background: #f8f9fa;
  color: black;
  height: 10vh;
  transition: all 0.3s;
  width: 100%;
}

.navbar-nav li:not(:last-child) {
  margin-right: 2em;
}
.navbar-nav li {
  border-bottom: 1px solid rgba(255, 255, 255, 0);
}
.navbar-nav li:hover {
  border-bottom: 1px solid rgb(61, 131, 206);
}
.nav a {
  color: white;
  font-size: 1.1rem;
}
.navbar-brand img {
  cursor: pointer;
  width: 60%;
}

.nav-link {
  transition: all 0.2s ease-in-out;
}

.nav-link:hover {
  transform: scale(1.05);
}
@media (min-width: 991.98px) {
  .nav-alt .nav-link {
    font-size: 1.1rem;
    color: #333 !important;
    font-weight: 500;
  }
}

@media (max-width: 991.98px) {
  .menu-drop {
    background-color: rgb(68, 68, 68);
    border-radius: 0.5em;
  }
  .nav-alt .nav-link {
    color: #fff !important;
    font-weight: 500;
  }
}

.nav-alt li a {
  border-bottom: 1px solid rgba(255, 255, 255, 0);
  color: black;
}
.nav-alt li:hover {
  border-bottom: 1px solid rgb(61, 131, 206);
}

.nav-transparent .nav-link {
  font-size: 1.1rem;
  color: #ffffff !important;
  font-weight: 500;
}

.navbar-brand-fixed img {
  width: 40%;
}
</style>

<style scoped>
.nav-link {
  font-size: 1.1rem;
}
</style>

