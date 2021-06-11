<template>
  <div>
    <svg
      ref="svg"
      viewBox="0 0 350 350"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xml:space="preserve"
      :style="{
        width: width,
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom,
      }"
    >
      <g transform="matrix(1,0,0,1,-75,-75)">
        <g transform="matrix(1.08457,0,0,1.08457,-40.5902,-71.9044)">
          <path ref="polymorph" :d="paths[paths.length - 1]" :fill="color" />
        </g>
      </g>
    </svg>
  </div>
</template>

<script>
export default {
  name: 'DataAvailabilityHeaderCircleComponent',

  props: {
    color: {
      type: String,
      required: true,
    },
    blur: {
      type: String,
      required: true,
    },
    width: {
      type: String,
      required: true,
    },
    position: {
      type: Object,
      required: true,
    },
    paths: {
      type: Array,
      required: true,
    },
  },

  data() {
    return {
      isAnimationPlaying: false,
      animation: null,
    }
  },

  mounted() {
    this.$nextTick(() => {
      const pathValuesArray = []

      this.paths.forEach((path) => {
        pathValuesArray.push({
          value: path,
        })
      })

      this.animation = this.$anime({
        targets: this.$refs.polymorph,
        d: pathValuesArray,
        easing: 'linear',
        duration: 10000,
        loop: true,
        direction: 'alternate',
        autoplay: false,
      })

      this.animation.play()

      // Using the Intersection Observer to play & pause the animation when visibility change

      const options = {
        root: null, // A null root value defaults to the browser viewport
        rootMargin: '50px',
        threshold: 0,
      }

      const observer = new IntersectionObserver(this.playPause, options)
      observer.observe(this.$refs.svg)
    })
  },

  methods: {
    playPause(entries, observer) {
      if (this.isAnimationPlaying) {
        this.animation.pause()
        this.isAnimationPlaying = false
      } else {
        this.animation.play()
        this.isAnimationPlaying = true
      }
    },
  },
}
</script>

<style lang="scss" scoped>
svg {
  fill-rule: evenodd;
  clip-rule: evenodd;
  stroke-linejoin: round;
  stroke-miterlimit: 2;

  position: absolute;
  height: auto;
  overflow: visible;
  will-change: transform;
}
</style>
