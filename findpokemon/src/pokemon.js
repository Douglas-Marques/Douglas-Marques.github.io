class Pokemon {
  constructor(dados) {
    this._nome = dados.name;
    this._id = dados.id;
    this._thumbUrl = dados.sprites.front_default;
    this._altura = dados.height;
    this._peso = dados.weight;
    this._tipos = dados.types.map(t => t.type.name);
    this._estatisticas = dados.stats.map(t => t.stat.name + " " + t.base_stat);
  }

  get nome() {
    return this._nome;
  }

  get id() {
    return this._id;
  }

  get thumbUrl() {
    return this._thumbUrl;
  }

  get altura() {
    return this._altura * 100;
  }

  get peso() {
    return this._peso / 10;
  }

  get tipos() {
    return this._tipos;
  }

  get estatisticas() {
    return this._estatisticas;
  }
}
