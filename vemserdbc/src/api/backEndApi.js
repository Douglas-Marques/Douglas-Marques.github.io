import Candidato from '../models/candidato.js'

export default class BackEndApi {
  constructor() {
    this.url = 'http://ec2-52-67-239-123.sa-east-1.compute.amazonaws.com:8080'
    this.authorization = 'Basic dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA='
    this.headers = new Headers({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': this.authorization
    })
    this.token = 'bearer ' + localStorage.getItem('authorization');
  }

  async login(username, password) {
    const grant_type = "password";
    var form = "";
    form += "username=" + username;
    form += "&password=" + password;
    form += "&grant_type=" + grant_type;

    return new Promise(resolve => {
      fetch(this.url + '/oauth/token', {
        method: 'post',
        body: form,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA='
        }
      })
        .then(j => j.json())
        .then(r => {
          localStorage.setItem('authorization', r.access_token);
          resolve(r)
        }, err => {
          throw new Error(err);
        }
        )
    });

  }

  async cadastrarCandidato(candidato) {
    const urlEndereco = this.url + '/api/candidato/dto'
    return new Promise(resolve => {
      fetch(urlEndereco, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Basic dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA='
        },
        body: JSON.stringify(candidato)
      })
        .then(j => j.json())
        .then(e => {
          resolve(e)
        })
        .catch((error) => {
          throw new Error(error);
        })
    });
  }

  async feedBackCandidato(candidatoDto) {
    const urlEndereco = this.url + '/api/candidato/' + `${candidatoDto.id}`
    return new Promise(resolve => {
      fetch(urlEndereco, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.token
        },
        body: JSON.stringify(candidatoDto)
      })
        .then(j => j.json())
        .then(e => {
          resolve(e)
        })
        .catch((error) => {
          throw new Error(error);
        })
    });
  }

  //método para a página de lista de usuários
  async listar(page, edicaoId, status, nomeCompleto) {
    const pageInfo = page ? `&page=${page.number}&size=${page.size}&sort=${page.orderBy},${page.orderType}`
      : '?page=0&size=10&sort=id,desc'
    const urlEndereco = this.url + '/api/candidato/edicao/etapa?id=' + edicaoId + '&etapa=' + status + '&nomeCompleto=' + nomeCompleto + pageInfo
    return new Promise(resolve => {
      fetch(urlEndereco, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.token
        },
      })
        .then(j => j.json())
        .then(e => {
          resolve(e)
        })
        .catch((error) => {
          throw new Error(error);
        })
    });
  }

  async listarPorEdicaoInteira(page, edicaoId, nomeCompleto) {
    const pageInfo = page ? `&page=${page.number}&size=${page.size}&sort=${page.orderBy},${page.orderType}`
      : '?page=0&size=10&sort=id,desc'
    const urlEndereco = this.url + '/api/candidato/edicao?id=' + edicaoId + '&nomeCompleto=' + nomeCompleto + pageInfo
    return new Promise(resolve => {
      fetch(urlEndereco, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.token
        },
      })
        .then(j => j.json())
        .then(e => {
          resolve(e)
        })
        .catch((error) => {
          throw new Error(error);
        })
    });
  }

  //método auxiliar para encontrar um usuário pelo id. está sendo consumido para fazer a lista
  async buscarPorUrl(urlCandidato) {
    return new Promise(resolve => {
      fetch(urlCandidato)
        .then(j => j.json())
        .then(p => {
          const candidato = new Candidato(p)
          resolve(candidato)
        })
    })
  }

  //método auxiliar para gerar a url
  async buscar(idCandidato) {
    let urlCandidato = `${this.url}/${idCandidato}/`
    return this.buscarPorUrl(urlCandidato)
  }

  async verificaCPFExistente(parametro) {
    const urlEndereco = this.url + '/api/candidato/cpf/' + parametro
    return new Promise(resolve => {
      fetch(urlEndereco, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA='
        }
      })
        .then(j => j.json())
        .then(e => {
          resolve(e)
        })
        .catch((error) => {
          throw new Error(error);
        })
    })
  }

  async verificaEmailExistente(parametro) {
    const urlEndereco = this.url + '/api/candidato/email/' + parametro
    return new Promise(resolve => {
      fetch(urlEndereco, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA='
        }
      })
        .then(j => j.json())
        .then(e => {
          resolve(e)
        })
        .catch((error) => {
          throw new Error(error)
        })
    })
  }

  async getCronograma() {
    const urlEndereco = this.url + '/api/edicao/cronograma'
    return new Promise(resolve => {
      fetch(urlEndereco, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA='
        }
      })
        .then(j => j.json())
        .then(e => {
          resolve(e)
        })
        .catch((error) => {
          throw new Error(error)
        })
    })
  }

  async getEdicaoAtual() {
    const urlEndereco = this.url + '/api/edicao/atual'
    return new Promise(resolve => {
      fetch(urlEndereco, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA='
        }
      })
        .then(j => j.json())
        .then(e => {
          resolve(e)
        })
        .catch((error) => {
          throw new Error(error)
        })
    })
  }

  async acompanharInscricao(cpf) {
    const urlEndereco = this.url + '/api/candidato/acompanhar/' + cpf
    return new Promise(resolve => {
      fetch(urlEndereco, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA='
        }
      })
        .then(j => j.json())
        .then(e => {
          resolve(e)
        })
        .catch((error) => {
          throw new Error(error)
        })
    })
  }

  async verificaInscricoesAbertas() {
    const urlEndereco = this.url + '/api/edicao/inscricoes'
    return new Promise(resolve => {
      fetch(urlEndereco, {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Basic dGVzdGp3dGNsaWVudGlkOlhZN2ttem9OemwxMDA='
        }
      })
        .then(j => j.json())
        .then(e => {
          resolve(e)
        })
        .catch((error) => {
          throw new Error(error)
        })
    })
  }

  // Método para verificar se usuário é Adiministrador
  async verificaSeAdm() {
    const urlEndereco = this.url + '/api/user/role'
    return new Promise(resolve => {
      fetch(urlEndereco, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.token
        }
      })
        .then(j => j.json())
        .then(e => {
          resolve(e)
        })
        .catch((err) => {
          throw new Error(err);
        })
    })
  }

  //método para a página de lista de usuários
  async listarSearchDate(page, start, end) {
    let pageInfo = page ? `?page=${page.number}&size=${page.size}&sort=${page.orderBy},${page.orderType}`
      : '?page=0&size=10&sort=id,desc'

    pageInfo = start ? pageInfo + '&start=' + start : pageInfo

    pageInfo = end ? pageInfo + '&end=' + end : pageInfo

    const urlEndereco = this.url + '/api/candidato/search' + pageInfo
    return new Promise(resolve => {
      fetch(urlEndereco, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.token
        },
      })
        .then(j => j.json())
        .then(e => {
          resolve(e)
        })
        .catch((error) => {
          throw new Error(error);
        })
    });
  }


  async cadastrarEdicao(edicao) {
    const urlEndereco = this.url + '/api/edicao/salva'
    return new Promise(resolve => {
      fetch(urlEndereco, {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.token
        },
        body: JSON.stringify(edicao)
      })
        .then(j => j.json())
        .then(e => {
          resolve(e)
        })
        .catch((error) => {
          throw new Error(error);
        })
    });
  }

  async atualizarEdicao(edicao) {
    const urlEndereco = this.url + '/api/edicao/editar-edicao/' + edicao.id
    return new Promise(resolve => {
      fetch(urlEndereco, {
        method: 'put',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.token
        },
        body: JSON.stringify(edicao)
      })
        .then(j => j.json())
        .then(e => {
          resolve(e)
        })
        .catch((error) => {
          throw new Error(error);
        })
    });
  }

  async excluirEdicao(edicao) {
    const urlEndereco = this.url + '/api/edicao/' + edicao.id
    return new Promise(resolve => {
      fetch(urlEndereco, {
        method: 'delete',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.token
        }
      })
        .then(e => {
          resolve(e)
        })
        .catch((error) => {
          throw new Error(error);
        })
    });
  }

  async buscarEdicoes() {
    const urlEndereco = this.url + '/api/edicao'
    return new Promise(resolve => {
      fetch(urlEndereco, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.token
        },
      })
        .then(j => j.json())
        .then(e => {
          resolve(e.content)
        })
        .catch((error) => {
          throw new Error(error);
        })
    })
  }

  async buscarEdicaoPorId(id) {
    const urlEndereco = this.url + '/api/edicao/' + id
    return new Promise(resolve => {
      fetch(urlEndereco, {
        method: 'get',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.token
        },
      })
        .then(j => j.json())
        .then(p => {
          const edicao = p
          resolve(edicao)
        })
    })
  }

  async cadastrarNotas(notas) {
    const urlEndereco = this.url + `/api/notas/${notas.id}`
    return new Promise(resolve => {
      fetch(urlEndereco, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': this.token
        },
        body: JSON.stringify(notas)
      })
        .then(j => j.json())
        .then(e => {
          resolve(e)
        })
        .catch((error) => {
          throw new Error(error);
        })
    });
  }

  async adicionarComentario(comentario, idCandidato) {
    const urlEndereco = this.url + `/api/candidato/comentar/${idCandidato}`
    return new Promise(resolve => {
      fetch(urlEndereco, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.token
        },
        body: JSON.stringify(comentario)
      })
        .then(j => j.json())
        .then(e => {
          resolve(e)
        })
        .catch((error) => {
          throw new Error(error);
        })
    });
  }

  async verificaHistorico(cpf) {
    const urlEndereco = this.url + `/api/candidato/historico/${cpf}`
    return new Promise(resolve => {
      fetch(urlEndereco, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.token
        }
      })
        .then(j => j.json())
        .then(e => {
          resolve(e)
        })
        .catch((error) => {
          throw new Error(error);
        })
    });
  }
}
