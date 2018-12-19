<template>
  <section id="mapa" class="container-fluid p-5 mapa-dbc">
    <div class="container">
      <!--Google map-->
      <div class="justify-content-center mb-5">
        <div class="row justify-content-center">
          <h1 class="mapa-titulo">Local da capacitação</h1>
        </div>
        <div class="row justify-content-center">
          <p class="mapa-descricao">
            <span class="mapa-descricao-linha">
              Av. Andaraí, 531
              <span class="apaga">–</span>
              <span class="mapa-descricao-linha-nova">
                <span></span> Bairro Passo D’Areia
              </span>
            </span>
            <span class="mapa-descricao-linha">
              Porto Alegre / RS
              <span class="apaga">–</span>
              <span class="mapa-descricao-linha-nova">
                <span></span> CEP: 91350-110
              </span>
            </span>
            <span class="mapa-descricao-linha">Telefone: +55 (51) 3330.7777</span>
          </p>
        </div>
      </div>
      <div id="map-container-7" class="row align-items-center justify-content-center">
        <GmapMap :center="dbc" :zoom="17" map-type-id="terrain" class="mapa-tamanho">
          <GmapMarker :position="dbc"/>
        </GmapMap>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "GMapa",
  props: { dbc: Object }
};
</script>

<style>
.mapa-dbc {
  background-color: #f2f2f2;
}

.mapa-titulo {
  display: inline;
}

.mapa-descricao {
  margin-top: 1.5rem;
  color: #333232;
  font-weight: 500;
}

.mapa-descricao-linha {
  display: block;
  text-align: center;
}

.mapa-tamanho {
  min-width: 100%;
  width: auto;
  height: 352px;
}

@media (max-width: 500px) {
  .mapa-titulo {
    text-align: center;
  }

  .mapa-descricao-linha-nova {
    display: block;
  }

  .apaga {
    display: none;
  }

  .mapa-tamanho {
    min-width: 100vw;
    width: auto;
    height: 100vh;
  }
}
</style>
