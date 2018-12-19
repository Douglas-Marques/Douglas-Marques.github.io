<template>
  <div class="form-group">
    <label v-bind:for="`${this.nome}Id`">{{ label }}:</label>
    <input
      type="text"
      v-bind:id="`${this.nome}Id`"
      class="form-control"
      v-validate="rulesObj ? rulesObj : rules"
      v-bind:name="nome"
      v-model="value"
      v-bind:placeholder="placeholder"
      v-bind:data-vv-as="label"
      v-mask="mask ? mask : ''"
    >
    <span class="text-danger">{{errors.first( this.nome )}}</span>
  </div>
</template>
<script>
export default {
  name: "InputForm",
  props: {
    nome: String,
    rules: String,
    rulesObj: Object,
    placeholder: String,
    label: String,
    mask: String
  },
  data: () => {
    return {
      value: ""
    };
  }
};
</script>