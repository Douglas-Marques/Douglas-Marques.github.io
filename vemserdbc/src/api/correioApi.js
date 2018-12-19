import Adress from '../models/endereco.js'

export default class CorreiosApi {
  constructor( url ) {
    this.url = url
  }

async carregarEndereco( cep ) { 
    const urlEndereco = `https://viacep.com.br/ws/${ cep }/json/`
    return new Promise( resolve => {
        fetch( urlEndereco )
        .then( j => j.json() )
        .then( e => {
          const endereco = new Adress( e )
          resolve( endereco )
        } )
    } )
  }
}