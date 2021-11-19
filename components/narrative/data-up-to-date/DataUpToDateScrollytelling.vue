<template>
  <section>
    <div class="container p-5 scrollytelling">
      <div class="scrollytelling__graphics">
        <div class="dots-container">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 200 200"
            class="overflow-visible"
          >
            <g ref="graph" style="opacity: 0">
              <g>
                <circle
                  v-for="dot in dots"
                  :key="dot.id"
                  :ref="`dot${dot.id}`"
                  :cx="dot.x"
                  :cy="dot.y"
                  r="3.5"
                  :fill="dot.color"
                ></circle>
              </g>

              <g>
                <line
                  v-for="line in lines"
                  :key="line.id"
                  :ref="`line${line.id}`"
                  :x1="line.x1"
                  :y1="line.y1"
                  :x2="line.x2"
                  :y2="line.y2"
                  :stroke="line.color"
                  stroke-width="0.8"
                  :stroke-dasharray="line.dashed ? '2' : 'none'"
                ></line>
              </g>
            </g>
          </svg>
        </div>

        <div ref="yAxis" class="fs-7 text-light axis y-axis">
          <div class="axis__arrow"></div>
          <div class="axis__labels"></div>
        </div>
        <div ref="xAxis" class="fs-7 text-light axis x-axis">
          <div class="axis__arrow"></div>

          <div class="axis__labels-container">
            <div class="axis__labels">
              <span>2014</span>
              <span>2015</span>
              <span>2016</span>
              <span>2017</span>
              <span>2018</span>
              <span>2019</span>
              <span>2020</span>
            </div>
          </div>
        </div>
      </div>

      <Scrollama
        class="text-light scrollytelling__texts"
        :offset="0.5"
        @step-enter="stepEnterHandler"
        @step-exit="stepExitHandler"
      >
        <div class="step">
          <p class="fs-4 mb-0">
            While data for some indicators can be collected on a monthly,
            quarterly and annual basis, it is very expensive to collect annual
            data for some indicators, especially when trends tend not to change
            frequently.
          </p>
        </div>

        <div class="step">
          <p class="fs-4 mb-0">
            However, it is crucial to collect timely data for some indicators,
            such as … And failing to do so affects the quality of policies.
          </p>
        </div>

        <div class="step">
          <p class="fs-4 mb-0">
            Some indicators are rarely updated and the last data available are
            from years ago making it difficult for decision makers and citizens
            to understand how close or far the country is from the goal.
          </p>
        </div>
      </Scrollama>
    </div>
  </section>
</template>

<script>
import jsonData from '~/data/data-up-to-date-scrollytelling-positions.json'

export default {
  name: 'DataUpToDateScrollytellingComponent',

  data() {
    return {
      dots: null,
      lines: null,
    }
  },

  beforeMount() {
    this.dots = jsonData.dots
    this.lines = jsonData.lines
  },

  methods: {
    stepEnterHandler({ element, index, direction }) {
      element.classList.add('current-step')

      if (direction === 'down') {
        switch (index) {
          case 0:
            this.enterStep1()
            break
          case 1:
            this.enterStep2()
            break
          case 2:
            this.enterStep3()
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
            this.exitStep2()
            break
          case 2:
            this.exitStep3()
            break
        }
      }
    },

    clearAnimations() {
      this.$anime.running.forEach((animation) => {
        animation?.pause()
      })
    },

    enterStep1() {
      const tl = this.$anime.timeline()

      tl.add(
        {
          targets: [this.$refs.xAxis, this.$refs.yAxis],
          opacity: 0.3,
          easing: 'easeOutQuint',
          duration: 1000,
        },
        0
      )
        .add(
          {
            targets: this.$refs.graph,
            opacity: 1,
            easing: 'easeInOutQuint',
            duration: 800,
          },
          300
        )
        .add(
          {
            targets: [this.$refs.line13, this.$refs.line14],
            opacity: 0,
            easing: 'easeInOutQuint',
            duration: 0,
          },
          0
        )
    },

    enterStep2() {
      this.clearAnimations()

      const tl = this.$anime.timeline()

      tl.add(
        {
          targets: [this.$refs.xAxis, this.$refs.yAxis],
          opacity: 0.3,
          easing: 'easeOutQuint',
          duration: 1000,
        },
        0
      )
        .add(
          {
            targets: this.$refs.graph,
            opacity: 1,
            easing: 'easeInOutQuint',
            duration: 800,
          },
          0
        )
        .add(
          {
            targets: [this.$refs.dot2, this.$refs.dot5],
            opacity: 0,
            easing: 'easeInOutQuint',
            duration: 800,
          },
          0
        )
        .add(
          {
            targets: [
              this.$refs.line1,
              this.$refs.line2,
              this.$refs.line4,
              this.$refs.line5,
            ],
            opacity: 0,
            easing: 'easeInOutQuint',
            duration: 800,
          },
          0
        )
        .add(
          {
            targets: [this.$refs.line13, this.$refs.line14],
            opacity: 1,
            easing: 'easeInOutQuint',
            duration: 800,
          },
          300
        )
    },

    enterStep3() {
      this.clearAnimations()

      const tl = this.$anime.timeline()

      tl.add(
        {
          targets: [this.$refs.xAxis, this.$refs.yAxis],
          opacity: 0.3,
          easing: 'easeOutQuint',
          duration: 1000,
        },
        0
      )
        .add(
          {
            targets: this.$refs.graph,
            opacity: 1,
            easing: 'easeInOutQuint',
            duration: 800,
          },
          0
        )
        .add(
          {
            targets: [
              this.$refs.dot2,
              this.$refs.dot5,
              this.$refs.dot11,
              this.$refs.dot12,
              this.$refs.dot13,
              this.$refs.dot14,
            ],
            opacity: 0,
            easing: 'easeInOutQuint',
            duration: 800,
          },
          0
        )
        .add(
          {
            targets: [
              this.$refs.line1,
              this.$refs.line2,
              this.$refs.line4,
              this.$refs.line5,
              this.$refs.line9,
              this.$refs.line10,
              this.$refs.line11,
              this.$refs.line12,
            ],
            opacity: 0,
            easing: 'easeInOutQuint',
            duration: 800,
          },
          0
        )
        .add(
          {
            targets: [this.$refs.line13, this.$refs.line14],
            opacity: 1,
            easing: 'easeInOutQuint',
            duration: 800,
          },
          300
        )
    },

    exitStep2() {
      this.clearAnimations()

      const tl = this.$anime.timeline()

      tl.add(
        {
          targets: [this.$refs.xAxis, this.$refs.yAxis],
          opacity: 0.3,
          easing: 'easeOutQuint',
          duration: 1000,
        },
        0
      )
        .add(
          {
            targets: this.$refs.graph,
            opacity: 1,
            easing: 'easeInOutQuint',
            duration: 800,
          },
          300
        )
        .add(
          {
            targets: [
              this.$refs.dot2,
              this.$refs.dot5,
              this.$refs.dot11,
              this.$refs.dot12,
              this.$refs.dot13,
              this.$refs.dot14,
            ],
            opacity: 1,
            easing: 'easeInOutQuint',
            duration: 800,
          },
          300
        )
        .add(
          {
            targets: [
              this.$refs.line1,
              this.$refs.line2,
              this.$refs.line4,
              this.$refs.line5,
              this.$refs.line9,
              this.$refs.line10,
              this.$refs.line11,
              this.$refs.line12,
            ],
            opacity: 1,
            easing: 'easeInOutQuint',
            duration: 800,
          },
          300
        )
        .add(
          {
            targets: [this.$refs.line13, this.$refs.line14],
            opacity: 0,
            easing: 'easeInOutQuint',
            duration: 800,
          },
          0
        )
    },

    exitStep3() {
      this.clearAnimations()

      const tl = this.$anime.timeline()

      tl.add(
        {
          targets: [this.$refs.xAxis, this.$refs.yAxis],
          opacity: 0.3,
          easing: 'easeOutQuint',
          duration: 1000,
        },
        0
      )
        .add(
          {
            targets: this.$refs.graph,
            opacity: 1,
            easing: 'easeOutQuint',
            duration: 800,
          },
          0
        )
        .add(
          {
            targets: [this.$refs.dot2, this.$refs.dot5],
            opacity: 0,
            easing: 'easeInOutQuint',
            duration: 800,
          },
          0
        )
        .add(
          {
            targets: [
              this.$refs.dot11,
              this.$refs.dot12,
              this.$refs.dot13,
              this.$refs.dot14,
            ],
            opacity: 1,
            easing: 'easeInOutQuint',
            duration: 800,
          },
          0
        )
        .add(
          {
            targets: [
              this.$refs.line1,
              this.$refs.line2,
              this.$refs.line4,
              this.$refs.line5,
            ],
            opacity: 0,
            easing: 'easeInOutQuint',
            duration: 800,
          },
          0
        )
        .add(
          {
            targets: [
              this.$refs.line9,
              this.$refs.line10,
              this.$refs.line11,
              this.$refs.line12,
            ],
            opacity: 1,
            easing: 'easeInOutQuint',
            duration: 800,
          },
          0
        )
        .add(
          {
            targets: [this.$refs.line13, this.$refs.line14],
            opacity: 1,
            easing: 'easeInOutQuint',
            duration: 800,
          },
          300
        )
    },
  },
}
</script>

<style lang="scss" scoped>
.dots-container {
  padding: 0 15px;
  height: calc(100% - 29px);
  width: calc(100% - 29px);
  position: absolute;
  right: 0;
}

.axis {
  display: flex;
  position: absolute;
  bottom: 0;
  opacity: 0;
}

.axis__arrow {
  // LINE
  background: $white;
  position: relative;

  // ARROW
  &::after {
    content: '';
    border: solid $white;
    display: inline-block;
    padding: 3px;
    transform: rotate(-45deg);
    position: absolute;
  }
}

.axis__labels {
  display: grid;
}

// Y AXIS

.y-axis {
  flex-direction: row-reverse;
  height: 100%;
  left: 0;

  & .axis__arrow {
    // LINE
    height: 100%;
    width: 1px;
    margin-left: 10px;

    // ARROW
    &::after {
      border-width: 1px 1px 0 0;
      top: 0;
      right: -3px;
    }
  }

  & .axis__labels {
    grid-template-rows: 1fr;
    height: calc(100% - 29px);
    min-width: 18px;
    align-items: center;

    & span {
      writing-mode: vertical-lr;
      transform: rotate(-180deg);
    }
  }
}

// X AXIS

.x-axis {
  flex-direction: column;
  width: 100%;

  & .axis__arrow {
    // LINE
    height: 1px;
    width: 100%;
    margin-bottom: 10px;

    // ARROW
    &::after {
      border-width: 0 1px 1px 0;
      top: -3px;
      right: 0;
    }
  }

  & .axis__labels-container {
    height: 18px;
  }

  & .axis__labels {
    gap: 15px;
    padding: 0 15px;
    width: calc(100% - 29px);
    align-self: flex-end;
    text-align: center;
    position: absolute;
    right: 0;
    grid-template-columns: repeat(7, 1fr);
  }
}
</style>
