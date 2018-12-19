<template>
  <transition v-if="show" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div >
              <div class="modal-header">
                <h5 class="modal-title">{{ errorTitle }}</h5>
              </div>
              <div class="modal-body d-flex flex-column align-items-center">
                <img height="100px" width="100px" src="../../assets/error.png" />
                <p class="mt-2"> {{ errorMsg }} </p>
              </div>
              <div class="modal-footer">
                <button type="button" class="btn btn-secondary" @click="show = false">Fechar</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>

export default {
    name: 'PopUpError',
    data: () => {
      return {
        show: false,
        errorTitle: "",
        errorMsg: ""
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
</style>