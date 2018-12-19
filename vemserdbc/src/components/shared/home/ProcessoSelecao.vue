<template>
  <section class="sectionTotScreen container-fluid cronograma p-5">
    <div class="container processos">
      <div class="row justify-content-center mb-5">
        <div>
          <h1 class="cronograma-title">Etapas do processo de seleção</h1>
        </div>
      </div>
      <div class="cronograma-conteudo">
        <div class="row align-items-center justify-content-center">
          <Etapa v-for="etapa in etapas1a3" :key="etapa.img" :img="etapa.img" :texto="etapa.txt"/>
        </div>
        <div class="row align-items-center justify-content-center">
          <Etapa v-for="etapa in etapas4e5" :key="etapa.img" :img="etapa.img" :texto="etapa.txt"/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import Etapa from "../Etapa.vue";

export default {
  name: "ProcessoSelecao",
  components: { Etapa },
  data: () => {
    return {
      etapas1a3: [
        { 
          img: require("../../../assets/people.png"),
          txt: "Período de inscrições online" },
        {
          img: require("../../../assets/form.png"),
          txt: "Formulário de perguntas online"
        },
        {
          img: require("../../../assets/frequency.png"),
          txt: "Avaliação psicológica"
        }
      ],
      etapas4e5: [
        {
          img: require("../../../assets/pen.png"),
          txt: "Prova de lógica de programação"
        },
        {
          img: require("../../../assets/interview.png"),
          txt: "Entrevistas presenciais"
        }
      ]
    };
  }
};
</script>

<style>
.cronograma {
  background: linear-gradient(
      120deg,
      rgba(53, 208, 88, 0.62),
      rgba(61, 131, 206, 0.69)
    ),
    url("../../../assets/cronograma.jpeg") no-repeat;
  background-attachment: fixed;
  background-size: cover;
  padding-bottom: 20px;
}

.processos {
  background-color: rgba(138, 255, 208, 0.5);
  border-radius: 5px;
  -moz-box-shadow: 0 0 70px rgba(138, 255, 208);
  -webkit-box-shadow: 0 0 70px rgba(138, 255, 208);
  box-shadow: 0 0 70px rgba(138, 255, 208);
}

.cronograma-title {
  padding-top: 2rem;
  text-align: center;
}
#titulo-cronograma {
  margin-top: 10px;
  margin-bottom: -15px;
}

.cronograma-conteudo {
  padding-bottom: 30px;
}

.icon-cronograma {
  width: 50px;
  height: 50px;
  margin-top: 30px;
}

.item-cronograma {
  margin-top: 30px;
  transition: all 0.2s ease-in-out;
}

.item-cronograma:hover {
  transform: scale(1.05);
}
</style>
