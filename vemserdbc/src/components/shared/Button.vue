<template>
  <button class="btn btn-primary" :class="{efeito:inscricao}" :disabled="!inscricao" @click="onClick">{{texto}}</button>
</template>

<script>
export default {
  name: "Button",
  data: () => {
    return {
      texto: undefined
    };
  },
  props: {
    onClick: Function,
    inscricao: Boolean
  },
  created() {
    this.texto = this.inscricao
      ? "Inscreva-se!"
      : "Aguarde a nova fase de inscrição";
  }
};
</script>

<style scoped>
.btn {
  border: none;
  box-shadow: 0px 10px 30px 0px rgba(0, 129, 255, 0.5);
  border-radius: 20px;
}

.efeito {
  width: 15rem;
  
}

.efeito:hover {
  background-color: rgb(55, 232, 89);
  transition: background-color 0.8s ease-out;
  border: none;
  border-radius: 20px;
  box-shadow: 0px 10px 30px 0px rgba(55, 232, 89, 0.7);
}

@media (max-width: 600px) {
  .btn {
    font-size: 1rem;
    white-space: normal;
  }
}
</style>
