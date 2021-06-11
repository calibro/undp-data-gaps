<template>
  <div class="bg-dark data-availability-header">
    <div class="circles-container">
      <data-availability-header-circle
        v-for="circle in circlesInfo"
        :key="circle.id"
        :color="circle.color"
        :blur="circle.blur"
        :width="circle.width"
        :position="{
          top: circle.position.top,
          left: circle.position.left,
          right: circle.position.right,
          bottom: circle.position.bottom,
        }"
        :paths="circle.paths"
      />
    </div>
  </div>
</template>

<script>
import circlesInfo from '~/components/narrative/data-availability/data-availability-header-circles-info.json'
import DataAvailabilityHeaderCircle from '~/components/narrative/data-availability/DataAvailabilityHeaderCircle'

export default {
  name: 'DataAvailabilityHeaderComponent',

  components: {
    DataAvailabilityHeaderCircle,
  },

  data() {
    return {
      circlesInfo: null,
    }
  },

  beforeMount() {
    this.circlesInfo = circlesInfo
  },
}
</script>

<style lang="scss" scoped>
.data-availability-header {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;

  & .circles-container {
    height: 100%;
    width: 100%;
    position: relative;
    filter: blur(25px);
  }
}
</style>
