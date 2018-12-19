<template>
  <button class="btn btn-primary" :class="{efeito:inscricao}" @click="onClick">{{texto}}</button>
</template>

<script>
export default {
  name: "ButtonNormal",
  props: {
    onClick: Function,
    texto: ""
  }
};
</script>

<style scoped>
.btn {
  border: none;
  box-shadow: 0px 10px 30px 0px rgba(0, 129, 255, 0.5);
  border-radius: 20px;
}

@media (max-width: 600px) {
  .btn {
    font-size: 1rem;
    white-space: normal;
  }
}
</style>
