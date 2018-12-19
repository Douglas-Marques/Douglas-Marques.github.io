
<template>
  <div class="form-group">
    <label for="cpfInput1"></label>
    <input type="text" v-validate=" 'required|regraCpf' " v-bind:name="nome" v-model="valor" class="form-control" id="exampleInputCpf1" aria-describedby="cpfHelp" placeholder="CPF"><br>
    <span>{{errors.first( this.nome )}}</span>
  </div>
</template>
<script>
export default {
  name: 'Cpf',
  props: {
    nome: String
  },
  data: () => {
    return {
      valor: ''
    }
  },
  
}
</script>

<style>

</style>