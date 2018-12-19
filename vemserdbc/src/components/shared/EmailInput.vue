<template>
  <div class="form-group">
    <label for="exampleInputEmail1">E-mail:</label>
    <input
      type="text"
      v-validate=" 'required|email' "
      v-bind:name="nome"
      v-model="value"
      class="form-control"
      id="exampleInputEmail1"
      placeholder="usuario@email.com"
      data-vv-as="email"
      v-on:change="funcao"
    >
    <span class="text-danger">{{errors.first( this.nome )}}</span>
  </div>
</template>
<script>
export default {
  name: "EmailInput",
  props: {
    nome: String,
    funcao: Function
  },
  data: () => {
    return {
      value: ""
    };
  }
};
</script>
