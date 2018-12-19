export default class Endereco {
    constructor( jsonVindoDaApi ) {
      this.logradouro = jsonVindoDaApi.logradouro
      this.bairro = jsonVindoDaApi.bairro
      this.cidade = jsonVindoDaApi.localidade
      this.estado = jsonVindoDaApi.uf
    }

  }