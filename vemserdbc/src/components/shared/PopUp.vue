<template>
  <transition name="fade">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div v-show="loading">
              <div class="modal-header">
                <h5 class="modal-title">Estamos enviando a operação!</h5>
              </div>
              <div class="modal-body">
                <Loader />
              </div>
            </div>
            <div v-show="!loading">
              <div class="modal-header">
                <h5 v-if="error" class="modal-title">Não foi possível finalizar a operação!</h5>
                <h5 v-else class="modal-title">Operação realizada!</h5>
              </div>
              <div class="modal-body">
                <img v-if="error" class="col-4" src="../../assets/error.png" />
                <img v-else class="col-4" src="../../assets/sucesso.png" />
              </div>
              <div class="modal-footer">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import Loader from '../shared/Loader'

export default {
    name: 'PopUp',
    components:{
      Loader
    },
    props:{
      show: Boolean,
      loading: Boolean,
      error: Boolean
    },
    data: () => {
        return {

        }
    }
}
</script>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
