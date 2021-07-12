<template>
  <canvas id="canvas"></canvas>
</template>

<script>
import BlackHole from '~/assets/scripts/home-animation/BlackHole'
import Particle from '~/assets/scripts/home-animation/Particle'

export default {
  name: 'HomeHeaderAnimationComponent',

  mounted() {
    let canvas
    let ctx
    let w, h
    let particles
    let blackHole
    const colors = this.$goals.map((goal) => {
      return goal.color
    })

    function setup() {
      canvas = document.getElementById('canvas')
      ctx = canvas.getContext('2d', { alpha: false })
      // reset()
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      setupParticles()
      blackHole = new BlackHole(w / 2, h / 2)
      // window.addEventListener('resize', reset)
    }

    function setupParticles() {
      particles = []

      for (let i = 0; i < 17; i++) {
        const p = new Particle(
          random(-50, w),
          random(-50, h),
          colors[Math.floor(Math.random() * (colors.length - 0) + 0)]
        )
        particles.push(p)
      }
    }

    // function reset() {
    //   w = canvas.width = window.innerWidth
    //   h = canvas.height = window.innerHeight
    // }

    function random(min, max) {
      if (max === undefined) {
        max = min
        min = 0
      }
      return Math.floor(Math.random() * (max - min)) + min
    }

    function render() {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles = particles.filter((p) => {
        // Particle draw is done in the filter to avoid another loop and get better performance
        blackHole.applyGravityOn(p)
        p.draw(ctx, w, h)
        p.move()

        return blackHole.pos.sub(p.pos).getLength() > 2
      })

      if (particles.length < 17) {
        const newParticle = new Particle(
          random(-50, w),
          random(-50, h),
          colors[Math.floor(Math.random() * (colors.length - 0) + 0)]
        )
        particles.push(newParticle)
      }

      requestAnimationFrame(render)
    }

    setup()
    this.$anime({
      targets: canvas,
      opacity: 1,
      easing: 'easeOutQuint',
      duration: 2000,
    })
    render()
  },
}
</script>

<style lang="scss" scoped>
canvas {
  display: block;
  opacity: 0;
}
</style>
