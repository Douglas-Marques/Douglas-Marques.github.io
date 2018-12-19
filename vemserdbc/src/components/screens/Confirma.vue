<template>
  <section class="container-fluid fundo">
    <div class="overlay"></div>
    <div class="row align-items-center justify-content-center">
      <div class="col-lg-4 col-md-5 col-sm-8 col-10 p-3 bloco shadow">
        <div class="d-flex flex-column justify-content-center">
          <div class="d-flex justify-content-center">
            <img src="../../assets/vemSerDBC.png">
          </div>
          <div class="d-flex justify-content-center">
            <h3>Participação Confirmada.</h3>
          </div>
          <div class="d-flex justify-content-center">
            <h4>Aguardamos você!</h4>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import BackEndApi from "../../api/backEndApi.js";
import Candidato from "../../models/candidato.js";

export default {
  name: "Confirma",
  data: {
    id: "",
    candidato: ""
  },
  methods: {
    async aprova(id) {
      const api = new BackEndApi();
      const candidatoDto = new Candidato();
      try {
        candidatoDto.id = id;
        candidatoDto.status = "PRESENCA_CONFIRMADA";
        const result = await api.feedBackCandidato(candidatoDto);
      } catch (err) {
        alert("Confirmação não realizada.");
      }
    }
  },
  created: function() {
    this.id = this.$route.params.id;
    this.aprova(this.id);
  }
};
</script>
<style>
.fundo {
  position: relative;
  background-image: url("../../assets/fundo-confirm.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}

.fundo .overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    120deg,
    rgba(53, 208, 88, 0.62),
    rgba(61, 131, 206, 0.76)
  );
  opacity: 0.75;
  z-index: 1;
  margin: auto;
}

.fundo .container {
  position: relative;
  z-index: 2;
}

.bloco {
  position: relative;
  background: white;
  z-index: 3;
  margin-top: 100px;
}
</style>
