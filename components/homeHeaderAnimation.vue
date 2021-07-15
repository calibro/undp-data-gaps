<template>
  <canvas ref="canvas"></canvas>
</template>

<script>
export default {
  name: 'HomeHeaderAnimationComponent',

  mounted() {
    this.drawCanvas()

    window.addEventListener('resize', this.saveAnimationFromResize)
  },

  beforeDestroy() {
    window.removeEventListener('resize', this.saveAnimationFromResize)
  },

  methods: {
    drawCanvas() {
      const canvas = this.$refs.canvas
      canvas.width = this.$el.parentElement.clientWidth
      canvas.height = this.$el.parentElement.clientHeight
      const ctx = canvas.getContext('2d')

      let screenWidth, screenHeight, smallerSize

      const colors = this.$goals.map((goal) => {
        return goal.color
      })

      const Z_RANGE = 100 // How deep is your love
      const Z_VELOCITY = -0.0025 // How fast
      const STARS_COUNT = 3000 // How many

      const setSizes = () => {
        screenWidth = canvas.clientWidth
        screenHeight = canvas.clientHeight
        smallerSize = screenWidth > screenHeight ? screenHeight : screenWidth
      }
      setSizes()

      const HOLE = {
        x: screenWidth / 2,
        y: screenHeight / 2,
        r: smallerSize / 4,
      }

      class Star {
        constructor(color) {
          this.reset()
          this.color = color
        }

        reset() {
          this.x = 1 - Math.random() * 2
          this.y = 1 - Math.random() * 2
          this.z = Math.random() * -Z_RANGE
          this.xPos = 0
          this.yPos = 0
          this.angle = 0.001
        }

        getPosition() {
          this.x = this.x * Math.cos(this.angle) - this.y * Math.sin(this.angle)
          this.y = this.y * Math.cos(this.angle) + this.x * Math.sin(this.angle)
          this.z += Z_VELOCITY

          this.xPos =
            ((screenHeight / screenWidth) * screenWidth * this.x) / this.z +
            screenWidth / 2
          this.yPos = (screenHeight * this.y) / this.z + screenHeight / 2

          // Detect collision with black hole
          if (
            Math.sqrt(
              (this.xPos - HOLE.x) * (this.xPos - HOLE.x) +
                (this.yPos - HOLE.y) * (this.yPos - HOLE.y)
            ) <= HOLE.r ||
            this.z >= Z_RANGE
          )
            this.reset()
        }

        draw() {
          const size = 4 - -this.z / 2

          ctx.globalAlpha = (Z_RANGE + this.z) / (Z_RANGE * 2)
          ctx.fillStyle = this.color
          ctx.fillRect(this.xPos, this.yPos, size, size)
          ctx.globalAlpha = 1
        }
      }
      const stars = new Array(STARS_COUNT)

      for (let i = 0; i < STARS_COUNT; i++)
        stars[i] = new Star(
          colors[Math.floor(Math.random() * (colors.length - 0) + 0)]
        )

      let paused = false
      const animate = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)

        ctx.beginPath()
        ctx.fillStyle = 'white'
        stars.forEach((star) => {
          star.getPosition()
          star.draw()
        })
        ctx.fill()

        if (!paused) {
          requestAnimationFrame(animate)
        }
      }
      window.addEventListener('resize', (e) => {
        setSizes()
        canvas.width = screenWidth
        canvas.height = screenHeight
        HOLE.r = smallerSize / 4
        HOLE.x = screenWidth / 2
        HOLE.y = screenHeight / 2
      })
      animate()

      // Grab the prefers reduced media query.
      const reducedMovement = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      )

      // Check if the media query matches or is not available.
      if (!reducedMovement || reducedMovement.matches) {
        paused = true
      }

      // Ads an event listener to check for changes in the media query's value.
      reducedMovement.addEventListener('change', () => {
        if (reducedMovement.matches) {
          paused = true
        } else {
          paused = false
          animate()
        }
      })
    },

    saveAnimationFromResize() {
      this.$refs.canvas.classList.add('canvas--wait-for-resize')

      clearTimeout(this.resizeTimeout)
      this.resizeTimeout = setTimeout(this.resumeFromResize, 1000)
    },

    resumeFromResize() {
      this.$refs.canvas.classList.remove('canvas--wait-for-resize')
      this.$refs.canvas.getContext('2d').restore()

      this.drawCanvas()
    },
  },
}
</script>

<style lang="scss" scoped>
canvas {
  display: block;
  transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1); /* easeOutQuint */
}

.canvas--wait-for-resize {
  opacity: 0.3;
}
</style>
