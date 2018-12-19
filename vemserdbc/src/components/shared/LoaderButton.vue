<template>
  <div class="cs-loader-btn">
    <div class="cs-loader-btn-inner">
      <label>	●</label>
      <label>	●</label>
      <label>	●</label>
      <label>	●</label>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoaderButton'
}
</script>


<style>
.cs-loader-btn {
  position: relative;
  top: 0;
  left: 0;
  height: 20px;
  width: 55px;
  overflow: hidden;
}

.cs-loader-btn-inner {
  transform: translateY(-50%);
  top: 50%;
  position: absolute;
  width: 100%;
  color: #1e2023;
  padding: 0;
  text-align: center;
}

.cs-loader-btn-inner label {
  font-size: 16px;
  opacity: 0;
  display:inline-block;
}

@keyframes lol {
  0% {
    opacity: 0;
    transform: translateX(-65px);
  }
  33% {
    opacity: 1;
    transform: translateX(0px);
  }
  66% {
    opacity: 1;
    transform: translateX(0px);
  }
  100% {
    opacity: 0;
    transform: translateX(65px);
  }
}

@-webkit-keyframes lol {
  0% {
    opacity: 0;
    -webkit-transform: translateX(-100px);
  }
  33% {
    opacity: 1;
    -webkit-transform: translateX(0px);
  }
  66% {
    opacity: 1;
    -webkit-transform: translateX(0px);
  }
  100% {
    opacity: 0;
    -webkit-transform: translateX(100px);
  }
}

.cs-loader-btn-inner label:nth-child(6) {
  -webkit-animation: lol 1.5s infinite ease-in-out;
  animation: lol 1.5s infinite ease-in-out;
}

.cs-loader-btn-inner label:nth-child(5) {
  -webkit-animation: lol 1.5s 100ms infinite ease-in-out;
  animation: lol 1.5s 100ms infinite ease-in-out;
}

.cs-loader-btn-inner label:nth-child(4) {
  -webkit-animation: lol 1.5s 200ms infinite ease-in-out;
  animation: lol 1.5s 200ms infinite ease-in-out;
}

.cs-loader-btn-inner label:nth-child(3) {
  -webkit-animation: lol 1.5s 300ms infinite ease-in-out;
  animation: lol 1.5s 300ms infinite ease-in-out;
}

.cs-loader-btn-inner label:nth-child(2) {
  -webkit-animation: lol 1.5s 400ms infinite ease-in-out;
  animation: lol 1.5s 400ms infinite ease-in-out;
}

.cs-loader-btn-inner label:nth-child(1) {
  -webkit-animation: lol 1.5s 500ms infinite ease-in-out;
  animation: lol 1.5s 500ms infinite ease-in-out;
}
</style>
