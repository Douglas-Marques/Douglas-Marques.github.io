<template>
  <section class="container-fluid fundo">
    <div class="overlay"></div>
    <div class="container">
      <div class="row align-items-center justify-content-center" id="corpoLogin">
        <div class="col-lg-4 col-md-5 col-sm-8 col-10 p-3 bloco shadow">
          <div>
            <router-link :to="{ name: 'Home'}">Voltar</router-link>
          </div>
          <div class="d-flex flex-column justify-content-center">
            <div class="d-flex justify-content-center">
              <img id="logoLogin" src="../../assets/LogoVemSerDBC.png">
            </div>
            <form @submit.prevent="onSubmit">
              <div class="form-group">
                <label for="usuarioId"></label>
                <input
                  nome="usuario"
                  id="usuarioId"
                  v-model="dto.username"
                  class="form-control"
                  placeholder="Usuário"
                >
              </div>
              <div class="form-group">
                <label for="senhaId"></label>
                <input
                  type="password"
                  id="senhaId"
                  v-model="dto.password"
                  class="form-control"
                  placeholder="Senha"
                >
              </div>
              <div class="d-flex justify-content-center">
                <ButtonLogin v-bind:texto="textoBotao" v-bind:onClick="noop" type="submit"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
    <PopUpError ref="popupError"/>
  </section>
</template>

<script>
import ButtonLogin from "../shared/ButtonLogin.vue";
import PasswordInput from "../shared/PasswordInput.vue";
import BackEndApi from "../../api/backEndApi.js";
import PopUpError from "../shared/PopUpError.vue";

export default {
  name: "Login",
  components: {
    ButtonLogin,
    PasswordInput,
    PopUpError
  },
  data: () => {
    return {
      textoBotao: "Entrar",
      dto: {},
      router: {}
    };
  },
  methods: {
    noop() {},
    async onSubmit() {
      const api = new BackEndApi();
      try {
        let result = await api.login(this.dto.username, this.dto.password);
        if (result.error) {
          this.$refs.popupError.errorTitle = "Não foi possível fazer Login";
          this.$refs.popupError.errorMsg =
            "Verifique se o Usuário e Senha estão corretos!";
          this.$refs.popupError.show = true;
          return;
        } else {
          this.$router.push({ name: "Candidatos" });
        }
      } catch (err) {
        console.log(err);
        return;
      }
    }
  }
};
</script>

<style>
#corpoLogin {
  padding-bottom: 8%;
}

#logoLogin {
  height: 10rem;
}

.fundo {
  position: relative;
  background-image: url("../../assets/fundo-login.jpg");
  height: 100vh;
  min-height: 25rem;
  width: 100%;
  overflow: hidden;
}

.fundo .overlay {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(
    120deg,
    rgba(53, 208, 88, 0.62),
    rgba(61, 131, 206, 0.76)
  );
  opacity: 0.75;
  z-index: 1;
}

.fundo .container {
  position: relative;
  z-index: 2;
}

.fundo .container .row {
  height: 100vh;
}

.bloco {
  background: white;
  margin-top: 50px;
}
</style>
