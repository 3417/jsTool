


<template>
  <!-- toast样式 -->
  <transition name="fadeIn">
    <div class="vt-toast" :class="position" v-show="show">
      <div class="vt-context">{{text}}</div>
    </div>
  </transition>
</template>

<script>
export default {
  props: {
    show: {
      //弹窗展示
      type: Boolean,
      default: false,
    },
    text: {
      //文本
      type: String,
      default: "...",
    },
    position: {
      //位置
      type: String,
      default: "center",
    },
    time: {
      //延时
      type: Number,
      default: 1500,
    },
  },
};
</script>

<style scoped>
.vt-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  z-index: 5000;
  border-radius: 10px;
  padding: 10px 20px;
}
.top {
  top: 150px;
}
.bottom {
  top: auto;
  bottom: 150px;
}
.center {
  top: 50%;
}

/* 动画效果 */
.fadeIn-enter-active,
.fadeIn-leave-active {
  transition: opacity 0.2s;
}
.fadeIn-enter,
.fadeIn-leave-active {
  opacity: 0;
}

/* 文字动画效果 */
.translate-top-enter-active,
.translate-top-leave-active {
  transition: all 0.2s cubic-bezier(0.36, 0.66, 0.04, 1);
}
.translate-top-enter,
.translate-top-leave-active {
  transform: translateY(-50%);
  opacity: 0;
}
.translate-middle-enter-active,
.translate-middle-leave-active {
  transition: all 0.2s cubic-bezier(0.36, 0.66, 0.04, 1);
}
.translate-middle-enter,
.translate-middle-leave-active {
  transform: translateY(80%);
  opacity: 0;
}
.translate-bottom-enter-active,
.translate-bottom-leave-active {
  transition: all 0.2s cubic-bezier(0.36, 0.66, 0.04, 1);
}
.translate-bottom-enter,
.translate-bottom-leave-active {
  transform: translateY(100%);
  opacity: 0;
}
</style>