export default class Candidato {
    constructor(  ) {
      this.id = ""
      this.nomeCompleto = ""
      this.dataInscricao = ""
      this.cpf = ""
      this.status = ""
      this.curriculo = ""
      this.telefone = ""
      this.instituicao = ""
      this.email = ""
    }

    jasonVindoDaApi (jsonVindoDaApi){
      this.id = jsonVindoDaApi.id
      this.nomeCompleto = jsonVindoDaApi.nomeCompleto
      this.dataInscricao = jsonVindoDaApi.dataInscricao
      this.cpf = jsonVindoDaApi.cpf
      this.status = jsonVindoDaApi.status
      this.curriculo = jsonVindoDaApi.curriculo
      this.telefone = jsonVindoDaApi.telefone
      this.instituicao = jsonVindoDaApi.instituicao
      this.email = jsonVindoDaApi.user.email
    }
}


  
