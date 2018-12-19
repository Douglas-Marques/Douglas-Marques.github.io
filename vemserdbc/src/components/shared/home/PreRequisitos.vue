<template>
  <section id="requisitos" class="container-fluid preRequisitos text-white">
    <div class="container">
      <div class="row justify-content-center">
        <div class="p-5 text-center">
          <h1>Pré-Requisitos</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-md-5 mt-5">
          <img class="img-fluid" src="../../../assets/student.png">
        </div>
        <div class="col-md-5 mt-5 fontPRequisitos">
          <li class="mb-4">
            <i class="fa fa-graduation-cap" aria-hidden="true"></i> Estar matriculado em um curso de TI (técnico ou superior)
          </li>
          <li class="mb-4">
            <i class="fa fa-book" aria-hidden="true"></i> Possuir conhecimento acadêmico em Lógica de programação
          </li>
          <li class="mb-3">
            <i class="fa fa-clock-o" aria-hidden="true"></i> Disponibilidade de horário durante as tardes
          </li>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "PreRequisitos"
};
</script>


<style>
.preRequisitos {
  background-color: #2ab279;
}

.fontPRequisitos {
  font-size: 1.5rem;
  padding-bottom: 0px !important;
}

li {
  list-style-type: none;
}
</style>
