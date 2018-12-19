<template>
  <section id="lab_social_icon_footer">
    <div class="container">
      <div class="row">
        <div class="col-sm blog align-self-start">
          <h3 class="blog-titulo">Conheça a DBC</h3>
          <Conheca/>
        </div>
        <div class="col-sm redes-sociais align-self-start">
          <h3 class="social-titulo">Social</h3>
          <a class="social" target="_blank" href="https://www.facebook.com/VemSerDBC/">
            <i id="social-fb" class="fa fa-facebook-square fa-3x social"></i>
          </a>
          <a
            class="social"
            target="_blank"
            href="https://www.linkedin.com/company/dbc-company/?originalSubdomain=pt"
          >
            <i id="social-tw" class="fa fa-linkedin-square fa-3x social"></i>
          </a>
          <a class="social" target="_blank" href="https://www.instagram.com/dbc.company/">
            <i id="social-gp" class="fa fa-instagram fa-3x social"></i>
          </a>
        </div>
        <div class="col-sm info align-self-start">
          <div class="sobre">
            <h3>Sobre</h3>
            <p>O Programa Vem Ser DBC é um programa de capacitação completo que estimula o crescimento profissional e pessoal de estudantes na área de tecnologia da informação.</p>
          </div>
          <div class="contatos">
            <h3>Contatos</h3>
            <p>
              <span class="contato">
                <i class="fa fa-phone" aria-hidden="true"></i> (51) 3092-8400
              </span>
              <span class="contato">
                <i class="fa fa-comments-o" aria-hidden="true"></i>
                <a target="_blank" href="https://www.messenger.com/t/VemSerDBC">
                  <span></span> VemSerDBC
                </a>
              </span>
              <span class="contato">
                <i class="fa fa-envelope" aria-hidden="true"></i> vemser@dbccompany.com.br
              </span>
            </p>
          </div>
        </div>
      </div>
      <div class="row align-self-end">
        <p class="mx-auto autoral">
          Site desenvolvido por participantes da primeira edição do VemSerDBC
          <i
            class="fa fa-coffee"
            aria-hidden="true"
          ></i>
        </p>
      </div>
    </div>
  </section>
</template>
<script>
import Conheca from "./Conheca.vue";
import ButtonNormal from "./ButtonNormal.vue";

export default {
  name: "Footer",
  components: { Conheca, ButtonNormal },
  methods: {
    login() {
      this.$router.push({ name: "Login" });
    }
  }
};
</script>
<style>
#lab_social_icon_footer {
  padding-top: 40px;
  background-color: #dedede;
}

#lab_social_icon_footer a {
  color: #333;
}

#lab_social_icon_footer #social-fb:hover {
  color: #3b5998;
}

#lab_social_icon_footer #social-tw:hover {
  color: #4099ff;
}

#lab_social_icon_footer #social-gp:hover {
  color: #d34836;
}

#lab_social_icon_footer #social-em:hover {
  color: #f39c12;
}

#btnRH {
  padding-right: 4.2rem;
  padding-bottom: 1rem;
}

.social {
  display: block;
  margin-bottom: 1rem;
}

.blog-titulo {
  display: block;
}

.redes-sociais {
  text-align: center;
}

.contatos {
  margin-top: 3rem;
}

.contato {
  display: block;
  color: #333232;
}

.social-titulo {
  margin-bottom: 2rem;
}

.autoral {
  margin-top: 2rem;
}

.sobre p {
  font-weight: 500;
  color: #333232;
}

@media (max-width: 767.98px) {
  .blog {
    display: none;
    visibility: hidden;
  }

  .social {
    display: inline-block;
    margin-right: 1rem;
  }

  .redes-sociais {
    text-align: center;
  }

  .autoral {
    text-align: center;
  }
}
</style>
