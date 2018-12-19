<template>
  <form v-on:submit.prevent="noop" id="formDataComentario">
    <div id="comentario" class="form-group">
      <h2 class="titulo">Comentário</h2>
      <textarea class="form-control" v-model="value" rows="7" cols="100" v-validate="'required'"></textarea>
      <div id="botaoSubmitComentario">
        <ButtonNormal
          class="btn float-right"
          v-on:click.native="onSubmitComentario(value)"
          v-bind:texto="'Salvar comentário'"
          :disabled="!isFormValid"
        />
      </div>
    </div>
  </form>
</template>

<script>
import ButtonNormal from "./ButtonNormal.vue";

export default {
  name: "Comentario",
  components: { ButtonNormal },
  props: {
    nome: String,
    onSubmitComentario: Function
  },
  computed: {
    isFormValid() {
      return !Object.keys(this.fields).some(key => this.fields[key].invalid);
    }
  },
  data: () => {
    return {
      value: ""
    };
  },
  created() {
    this.value = this.nome;
  }
};
</script>
<style>

#botaoSubmitComentario {
  padding-top: 1rem;
}

</style>

