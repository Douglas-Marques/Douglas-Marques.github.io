<template>
  <div class="col-sm-6 col-md-3 d-flex flex-column align-items-center">
    <div class="imagem-beneficio d-flex flex-column align-items-center justify-content-center">
      <img :src="img">
    </div>
    <h4 class="mb-4 beneficio-texto">{{texto}}</h4>
  </div>
</template>

<script>
export default {
  name: "Beneficio",
  props: {
    texto: String,
    img: String
  }
};
</script>

<style>
.imagem-beneficio {
  margin: 1.7em 0 0 0;
  height: 50vh;
}

.imagem-beneficio img {
  max-height: 50vh;
  max-width: 100%;
}

.beneficio-texto {
  color: #333232;
}
</style>
