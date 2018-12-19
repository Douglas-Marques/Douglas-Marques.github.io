<template>
  <div class="col-sm-6 col-md-3 d-flex flex-column align-items-center">
    <div class="imagem-conteudo d-flex flex-column align-items-center">
      <img :src="img">
    </div>
    <h6 class="mb-4 topico-texto">{{texto}}</h6>
  </div>
</template>

<script>
export default {
  name: "Topico",
  props: {
    texto: String,
    img: String
  }
};
</script>

<style>
.imagem-conteudo {
  margin: 1.7em 0 0 0;
  height: 15vh;
}

.imagem-conteudo img {
  max-height: 15vh;
  max-width: 75%;
}

.topico-texto {
  color: #636363;
}
</style>
