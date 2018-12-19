<template>
  <div class="col-md-4">
    <div class="col">
      <div class="row align-items-center justify-content-center">
        <img class="icon-cronograma" :src="img">
      </div>
      <div class="row align-items-center justify-content-center">
        <h5 class="item-cronograma mt-3">{{texto}}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Etapa",
  props: {
    texto: String,
    img: String
  }
};
</script>

<style>
.item-cronograma {
  color: #333232;
}
</style>

