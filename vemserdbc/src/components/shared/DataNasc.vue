
<template>
  <div class="form-group">
    <label for="dataNascInput1">Data de nascimento</label>
    <input type="text" 
          v-validate=" 'required|regraDataNasc' "
          v-bind:name="nome" 
          v-model="valor" 
          class="form-control" 
          id="dataNascInput1" 
          aria-describedby="dataHelp" 
          placeholder="Data Nascimento"
          >
    <span>{{errors.first( this.nome )}}</span>
  </div>
</template>
<script>
export default {
  name: 'DataNascInput',
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
