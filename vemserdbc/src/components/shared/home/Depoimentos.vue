<template>
  <section class="container-fluid carouselColor text-white">
    <div class="container">
      <div class="row justify-content-center">
        <div>
          <h1 class="text-center">Depoimentos de participantes das edições anteriores</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <CarouselHome/>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import CarouselHome from "../../shared/CarouselHome.vue";

export default {
  name: "Depoimentos",
  components: {
    CarouselHome
  }
};
</script>

<style>
.carouselColor {
  background-color: #357ebf;
}
</style>
