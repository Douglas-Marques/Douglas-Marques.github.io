export default class Edicao {
    constructor(  ) {
      this.id = ""
      this.ano = ""
      this.numeroEdicao = ""
      this.dataInicio = ""
      this.dataFim = ""
    }

    jsonVindoDaApi (jsonVindoDaApi){
      this.id = jsonVindoDaApi.id
      this.ano = jsonVindoDaApi.ano
      this.numeroEdicao = jsonVindoDaApi.numeroEdicao
      this.dataInicio = jsonVindoDaApi.dataInicio
      this.dataFim = jsonVindoDaApi.dataFim
    }
}


  
