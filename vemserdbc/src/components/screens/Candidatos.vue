<template>
<div>
  <div class="container-fluid mb-3" id="cabCandidatos">
    <div class="container p-2 ">
      <div class="row justify-content-between">
        <img src="../../assets/logo-vemser-topo.png" id="imgTopoVemSer">
        <h2 id="tituloRH">Área de Gestão de Pessoas</h2>
        
        <ButtonNormal class="btn ml-auto" v-bind:onClick="logout" v-bind:texto="textoLogout" type="submit"/>
      </div>
    </div>
  </div>  
  <div class="container-fluid">
    <TableCandidato/>
  </div>
</div>
</template>

<script>
import ButtonNormal from "../shared/ButtonNormal.vue";
import TableCandidato from "../shared/TableCandidato.vue";
import BackEndApi from "../../api/backEndApi.js";

export default {
  name: "Candidatos",
  components: {
    ButtonNormal,
    TableCandidato
  },
  data: () => {
    return {
      textoLogout: "Sair"
    };
  },
  methods: {
    async logout() {
      localStorage.setItem("authorization", "");
      this.$router.push({ name: "Login" });
    }
  }
};
</script>

<style>
  #cabCandidatos {
    background-image: linear-gradient(
    120deg,
    rgba(61, 131, 206, 0.76),
    rgba(53, 208, 88, 0.62)
    );
  }

  #imgTopoVemSer {
    height: 5rem;
  }

  #tituloRH {
    padding-left: 16rem;
    padding-top: 1rem;
  }
</style>


