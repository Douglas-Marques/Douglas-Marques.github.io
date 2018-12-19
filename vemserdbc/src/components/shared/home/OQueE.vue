<template>
  <section id="oqueeh" class="container-fluid bg-light p-5">
    <div class="container" id="todoOQueEh">
      <div class="row justify-content-center">
        <div class>
          <h1 class="mb-5">O que é?</h1>
        </div>
      </div>
      <div class="row" id="conteudoOQueEh">
        <div class="col-md-7">
          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class="carousel-item active">
                <img
                  class="d-block w-100"
                  src="../../../assets/grupo.jpeg"
                  alt="Primeiro Slide"
                  id="imgRadius"
                >
              </div>
              <div class="carousel-item">
                <img
                  class="d-block w-100"
                  src="../../../assets/grupo-2.jpeg"
                  alt="Segundo Slide"
                  id="imgRadius"
                >
              </div>
              <div class="carousel-item">
                <img
                  class="d-block w-100"
                  src="../../../assets/grupo-3.jpeg"
                  alt="Terceiro Slide"
                  id="imgRadius"
                >
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-5 p-3">
          <p
            id="fontSizeOQueeh"
          >O Programa Vem Ser DBC é uma capacitação de 12 semanas, durante 4h diárias no turno da tarde. Um programa completo que estimula o desenvolvimento pessoal e profissional que ocorre dentro de uma empresa Great Place to Work.</p>
          <p
            id="fontSizeOQueeh"
          >Você poderá se candidatar ao programa caso seja estudante em algum curso na área de Tecnologia de Informação e tenha conhecimento acadêmico em Lógica de Programação.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "OQueE"
};
</script>

<style>
#fontSizeOQueeh {
  font-size: 1.2rem;
  font-weight: 500;
  color: #636363;
  margin-bottom: 1.5rem;
}

#conteudoOQueEh {
  padding-left: 7rem;
}

#oqueeh {
  padding-bottom: 3rem;
}

#conteudoOQueEh,
.row {
  padding-left: 1vw;
  align-items: center;
}
</style>
