<template>
  <section class="bg-dark">
    <div class="container p-5 scrollytelling">
      <div class="scrollytelling__graphics">
        <div ref="developmentGoals" class="goals-container">
          <div
            v-for="goal in developmentGoals"
            :key="goal.id"
            ref="goal"
            :style="{ backgroundColor: goal.color }"
            class="d-flex justify-content-center align-items-center goal-circle"
          >
            <span class="fs-4 text-light">{{ goal.id }}</span>
          </div>
        </div>
        <div
          ref="dataAvailabilityAxis"
          class="fs-7 text-light data-availability-axis"
        >
          <div class="data-availability-axis__arrow"></div>
          <div class="data-availability-axis__labels">
            <span>0%</span>
            <span>DATA AVAILABILITY</span>
            <span>100%</span>
          </div>
        </div>
      </div>

      <Scrollama
        class="text-light scrollytelling__texts"
        :offset="0.5"
        @step-enter="stepEnterHandler"
        @step-exit="stepExitHandler"
      >
        <div class="step-1">
          <p class="fs-4 mb-5">
            The 2030 Agenda for Sustainable Development, adopted by all United
            Nations Member States in 2015, provides a shared blueprint for peace
            and prosperity for people and the planet, now and into the future.
          </p>
          <p class="fs-4 mb-5">
            At its heart are the 17 Sustainable Development Goals (SDGs), which
            are an urgent call for action by all countries.
          </p>
          <p class="fs-4 mb-0">
            Each SDG is tracked and monitored with different indicators that are
            common across countries. Methodology and standards to collect the
            data are established and they are available.
          </p>
        </div>

        <div class="step-2">
          <p class="fs-4 mb-5">
            Unluckly some countries in the Arab World don’t provide data for all
            the indicators for many reasons.
          </p>
          <p class="fs-4 mb-0">
            In the Arab region, data gaps make it difficult to monitor
            development impact on a society as a whole.
          </p>
        </div>

        <div class="step-3">
          <p class="fs-4 mb-0">
            Some countries don’t collect enough data about the enviroment and
            the sustainable development of their cities and communities.
          </p>
        </div>

        <div class="step-4">
          <p class="fs-4 mb-0">
            Other countries fail in representing social inequalities or
            indicators about their fight against poverty and discrimination.
          </p>
        </div>
      </Scrollama>
    </div>
  </section>
</template>

<script>
import developmentGoals from '~/data/development-goals.json'
import goalsPositions from '~/data/data-availability-scrollytelling-positions.json'

export default {
  name: 'DataAvailabilityScrollytellingComponent',

  data() {
    return {
      developmentGoals: null,
      goalsPositions: null,
      isGraphicAlreadyEntered: false,
    }
  },

  beforeMount() {
    this.developmentGoals = developmentGoals
    this.goalsPositions = goalsPositions
  },

  methods: {
    stepEnterHandler({ element, index, direction }) {
      element.classList.add('current-step')

      if (direction === 'down') {
        switch (index) {
          case 0:
            this.animateStepA()
            break
          case 1:
            this.animateStepB()
            break
          case 2:
            this.animateStepC()
            break
          case 3:
            this.animateStepD()
            break
          default:
            break
        }
      }
    },

    stepExitHandler({ element, index, direction }) {
      element.classList.remove('current-step')

      if (direction === 'up') {
        switch (index) {
          case 0:
            break
          case 1:
            this.animateStepBReversed()
            break
          case 2:
            this.animateStepCReversed()
            break
          case 3:
            this.animateStepC()
            break
          default:
            break
        }
      }
    },

    animateStepA() {
      if (this.isGraphicAlreadyEntered) {
        return
      }

      const deg = 0
      const radius = 200
      const fields = document.querySelectorAll('.goal-circle')
      const width = 500
      const height = 500
      let angle = deg || Math.PI * 3.5
      const step = (2 * Math.PI) / fields.length

      fields.forEach((field) => {
        const x = Math.round(
          width / 2 + radius * Math.cos(angle) - field.offsetWidth / 2
        )
        const y = Math.round(
          height / 2 + radius * Math.sin(angle) - field.offsetHeight / 2
        )

        this.$anime({
          targets: field,
          opacity: 1,
          left: (x * 100) / width + '%',
          top: (y * 100) / height + '%',
          translateX: 0,
          translateY: 0,
          easing: 'easeInOutElastic(.1, 2)',
          duration: 1200,
        })

        angle += step
      })

      this.isGraphicAlreadyEntered = true
    },

    animateStepB() {
      const fields = this.$refs.goal

      this.$anime({
        targets: document.querySelectorAll('.goal-circle span'),
        opacity: 0,
        easing: 'easeOutElastic(.1, 2)',
        duration: 1000,
      })

      fields.forEach((field, index) => {
        const tl = this.$anime.timeline()

        tl.add({
          targets: field,
          top: '2%',
          left: '50%',
          translateX: '-50%',
          translateY: '-10%',
          easing: 'easeInOutElastic(.1, 2)',
          duration: 800,
        })

        tl.add({
          targets: field,
          left: this.goalsPositions[index].step1 + '%',
          easing: 'easeOutElastic(.1, 2)',
          duration: 800,
        })
      })

      this.$anime({
        targets: this.$refs.dataAvailabilityAxis,
        opacity: 0.3,
        easing: 'easeOutElastic(.1, 2)',
        duration: 1200,
        delay: 1000,
      })
    },

    animateStepC() {
      const fields = this.$refs.goal

      fields.forEach((field, index) => {
        this.$anime({
          targets: field,
          left: this.goalsPositions[index].step2 + '%',
          easing: 'easeOutElastic(.1, 2)',
          duration: 1500,
        })
      })
    },

    animateStepD() {
      const fields = this.$refs.goal

      fields.forEach((field, index) => {
        this.$anime({
          targets: field,
          left: this.goalsPositions[index].step3 + '%',
          easing: 'easeOutElastic(.1, 2)',
          duration: 1500,
        })
      })
    },

    animateStepBReversed() {
      const deg = 0
      const radius = 200
      const fields = document.querySelectorAll('.goal-circle')
      const width = 500
      const height = 500
      let angle = deg || Math.PI * 3.5
      const step = (2 * Math.PI) / fields.length

      this.$anime({
        targets: this.$refs.dataAvailabilityAxis,
        opacity: 0,
        easing: 'easeOutElastic(.1, 2)',
        duration: 1200,
      })

      fields.forEach((field) => {
        const x = Math.round(
          width / 2 + radius * Math.cos(angle) - field.offsetWidth / 2
        )
        const y = Math.round(
          height / 2 + radius * Math.sin(angle) - field.offsetHeight / 2
        )

        this.$anime({
          targets: field,
          opacity: 1,
          left: (x * 100) / width + '%',
          top: (y * 100) / height + '%',
          translateX: 0,
          translateY: 0,
          easing: 'easeInOutElastic(.1, 2)',
          duration: 1000,
        })

        angle += step
      })

      this.$anime({
        targets: document.querySelectorAll('.goal-circle span'),
        opacity: 1,
        easing: 'easeInOutElastic(.1, 2)',
        duration: 1000,
      })
    },

    animateStepCReversed() {
      const fields = this.$refs.goal

      fields.forEach((field, index) => {
        this.$anime({
          targets: field,
          left: this.goalsPositions[index].step1 + '%',
          easing: 'easeOutElastic(.1, 2)',
          duration: 1500,
        })
      })
    },
  },
}
</script>

<!-- STRUCTURE STYLE -->

<style lang="scss" scoped>
.scrollytelling {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: ($spacer * 6);
}

.scrollytelling__graphics {
  position: sticky;
  top: 15vh;
  height: 500px;
  width: 500px;
  justify-self: flex-end;
}

.scrollytelling__texts {
  display: grid;
  grid-auto-rows: 1fr;
  row-gap: ($spacer * 12);
}

.step-1,
.step-2,
.step-3,
.step-4 {
  min-height: 500px;
  opacity: 0.3;
  transition: all 500ms ease-in-out;
}

.current-step {
  opacity: 1;
}
</style>

<!-- GRAPHICS STYLE -->

<style lang="scss" scoped>
.goals-container {
  position: relative;
  height: 100%;
}

.goal-circle {
  width: 50px;
  height: 50px;
  border-radius: 50%;

  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
}

.data-availability-axis {
  display: flex;
  flex-direction: column;
  position: absolute;
  width: 95%;
  top: 16%;
  left: 50%;
  transform: translateX(-50%);
  opacity: 0;
}

.data-availability-axis__arrow {
  // LINE
  height: 1px;
  background: white;
  width: 100%;
  margin: 0 auto;
  margin-bottom: 10px;
  position: relative;

  // This max width is due to the min and max position of the goals circles
  // on the axis (80% => 400px) plus half of the width of a single goal circle
  // on both sides (25px + 25px)
  max-width: 450px;

  // ARROW
  &::after {
    content: '';
    border: solid white;
    border-width: 0 1px 1px 0;
    display: inline-block;
    padding: 3px;
    transform: rotate(-45deg);
    position: absolute;
    right: 0;
    top: -3px;
  }
}

.data-availability-axis__labels {
  display: grid;
  grid-template-columns: 30px 1fr 30px;
  grid-gap: 10px;

  & span:nth-child(2) {
    justify-self: center;
  }

  & span:nth-child(3) {
    justify-self: flex-end;
  }
}
</style>
