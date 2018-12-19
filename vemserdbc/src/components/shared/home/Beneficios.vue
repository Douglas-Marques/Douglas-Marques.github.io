<template>
  <section id="beneficios" class="container-fluid d-flex flex-row bg-light beneficios p-5">
    <div class="container aling-self-center quadro-beneficio-color">
      <div class="row justify-content-center mb-5">
        <div>
          <h1 class="mt-5">Benefícios</h1>
        </div>
      </div>
      <div class="row mt-3">
        <Beneficio v-for="b in bs" :key="b.img" :texto="b.txt" :img="b.img"/>
      </div>
    </div>
  </section>
</template>

<script>
import Beneficio from "../Beneficio.vue";

export default {
  name: "Beneficios",
  components: { Beneficio },
  data: () => {
    return {
      bs: [
        {
          img: require("../../../assets/pork3.png"),
          txt: "Bolsa auxílio mensal de R$800,00 durante o treinamento."
        },
        {
          img: require("../../../assets/bus2.png"),
          txt: "Vale-transporte para comparecer aos treinamentos."
        },
        {
          img: require("../../../assets/job.png"),
          txt: "Possibilidade de efetivação em uma empresa GPTW."
        },
        {
          img: require("../../../assets/coffe.png"),
          txt: "Café à vontade para você programar melhor! (:"
        }
      ]
    };
  }
};
</script>

<style>
.beneficios {
  background: linear-gradient(
      120deg,
      rgba(53, 208, 88, 0.62),
      rgba(61, 131, 206, 0.69)
    ),
    url("../../../assets/colaboradores.jpeg") no-repeat;
  background-attachment: fixed;
  background-size: cover;
  padding-bottom: 20px;
}

.imagem-beneficio {
  margin: 1.7em 0 0 0;
  height: 40vh;
}

.quadro-beneficio-color {
  background-color: rgba(138, 255, 208, 0.5);
  border-radius: 5px;
  -moz-box-shadow: 0 0 70px rgba(138, 255, 208);
  -webkit-box-shadow: 0 0 70px rgba(138, 255, 208);
  box-shadow: 0 0 70px rgba(138, 255, 208);
}
</style>
