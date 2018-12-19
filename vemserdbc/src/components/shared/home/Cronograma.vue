<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center p-5">
        <h1>Fique atento aos prazos!</h1>
      </div>
    </div>
    <div class="row">
      <div class="col-md-12 col-sm-12 col-xs-12">
        <section class="main-timeline-section">
          <div class="timeline-start"></div>
          <div class="conference-center-line"></div>
          <div class="conference-timeline-content">
            <div class="timeline-article timeline-article-top">
              <div class="content-date single">
                <span>{{edicaoAtual.dataFim}}</span>
              </div>
              <div class="meta-date"></div>
              <div :class="{active_item:cronograma.fimCapacitacao}" class="content-box">
                <p>Fim da capacitação</p>
              </div>
            </div>
            <div class="timeline-article timeline-article-bottom">
              <div class="content-date single">
                <span>{{edicaoAtual.dataInicio}}</span>
              </div>
              <div class="meta-date"></div>
              <div :class="{active_item:cronograma.inicioCapacitacao}" class="content-box">
                <p>Inicio da capacitação</p>
              </div>
            </div>
            <div class="timeline-article timeline-article-top">
              <div class="content-date double">
                <span>{{edicaoAtual.dataInicioProcessoSeletivo}} à {{edicaoAtual.dataFimProcessoSeletivo}}</span>
              </div>
              <div class="meta-date"></div>
              <div :class="{active_item:cronograma.processoSeletivo}" class="content-box">
                <p>Processo seletivo</p>
              </div>
            </div>
            <div class="timeline-article timeline-article-bottom">
              <div class="content-date double">
                <span>{{edicaoAtual.dataInicioInscricao}} à {{edicaoAtual.dataFimInscricao}}</span>
              </div>
              <div class="meta-date"></div>
              <div :class="{active_item:cronograma.inscricoes}" class="content-box">
                <p>Inscrições abertas</p>
              </div>
            </div>
          </div>
          <div class="timeline-end"></div>
        </section>
      </div>
    </div>
  </div>
</template>

<script>
import BackEndApi from "../../../api/backEndApi.js";

export default {
  name: "Cronograma",
  components: { BackEndApi },
  data: () => {
    return { 
      cronograma: {
        inscricoes: false,
        processoSeletivo: false,
        inicioCapacitacao: false,
        fimCapacitacao: false
      },
      edicaoAtual: {
        dataInicio: "dd/mm/YYYY",
        dataFim: "dd/mm/YYYY",
        dataInicioInscricao: "dd/mm/YYYY",
        dataFimInscricao: "dd/mm/YYYY",
        dataInicioProcessoSeletivo: "dd/mm/YYYY",
        dataFimProcessoSeletivo: "dd/mm/YYYY"
}
    }
  },
  async created(){
    const api = new BackEndApi()
    this.cronograma = await api.getCronograma()
    this.edicaoAtual = await api.getEdicaoAtual()
  }
};
</script>

<style>
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

p {
  margin-bottom: 0;
}
.main-timeline-section {
  position: relative;
  width: 100%;
  margin: auto;
  height: 300px;
}
.main-timeline-section .timeline-start,
.main-timeline-section .timeline-end {
  position: absolute;
  background: #357ebf;
  border: 3px solid #fff;
  border-radius: 100px;
  top: 50%;
  transform: translateY(-50%);
  width: 30px;
  height: 30px;
  z-index: 10;
}
.main-timeline-section .timeline-end {
  right: 0px;
}
.main-timeline-section .conference-center-line {
  position: absolute;
  width: 100%;
  height: 5px;
  top: 50%;
  transform: translateY(-50%);
  background: #357ebf;
}
.timeline-article {
  width: 20%;
  position: relative;
  min-height: 300px;
  float: right;
}

.double{
  left: -70px;
  font-size: 15px;
}

.single{
  left: -24px;
}

.timeline-article .content-date {
  position: absolute;
  top: 35%;
  font-size: 15px;
}
.timeline-article .meta-date {
  position: absolute;
  top: 50%;
  left: 0px;
  transform: translateY(-50%);
  width: 20px;
  height: 20px;
  border-radius: 100%;
  background: #00bfff;
  border: 3px solid #fff;
}
.timeline-article .content-box {
  border: 3px solid rgb(107, 107, 107);
  border-radius: 5px;
  background-color: #fff;
  width: 180px;
  position: absolute;
  top: 60%;
  left: -80px;
  padding: 10px;
  color: #1f1f1f;
  text-align: center;
}

@media(max-width: 990px) {
  .timeline-article .content-box {
    width: 80px;
    height: 50px;
    left: -30px ;
  }

  .double{
    left: -21px !important;
    font-size: 15px !important;
  }

  .single{
    left: -15px !important;
  }

  p {
    line-height: 1rem;
    font-size: 0.7rem !important;
  }
  .content-date span {
    font-size: 0.7rem;
  }
}

.active_item {
  border: 3px solid rgba(53, 208, 89) !important;
  background-color: rgba(53, 208, 89) !important;
}
.timeline-article-top .content-box:before {
  content: " ";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: -20px;
  border: 10px solid transparent;
  border-bottom-color: #00bfff;
}
.timeline-article-bottom .content-date {
  top: 59%;
}
.timeline-article-bottom .content-box {
  top: 25%;
}
.timeline-article-bottom .content-box:before {
  content: " ";
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: -20px;
  border: 10px solid transparent;
  border-top-color: #00bfff;
}

p {
  font-size: 1rem;
}
</style>
