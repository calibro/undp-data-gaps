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
            <g ref="dots1" style="opacity: 0">
              <g>
                <circle
                  v-for="dot in dots1"
                  :key="dot.id"
                  :cx="dot.x"
                  :cy="dot.y"
                  r="3.5"
                  :fill="dot.color"
                ></circle>
              </g>

              <g>
                <line
                  v-for="line in lines1"
                  :key="line.id"
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

            <g ref="dots2" style="opacity: 0">
              <g>
                <circle
                  v-for="dot in dots2"
                  :key="dot.id"
                  :cx="dot.x"
                  :cy="dot.y"
                  r="3.5"
                  :fill="dot.color"
                ></circle>
              </g>

              <g>
                <line
                  v-for="line in lines2"
                  :key="line.id"
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

            <g ref="dots3" style="opacity: 0">
              <g>
                <circle
                  v-for="dot in dots3"
                  :key="dot.id"
                  :cx="dot.x"
                  :cy="dot.y"
                  r="3.5"
                  :fill="dot.color"
                ></circle>
              </g>

              <g>
                <line
                  v-for="line in lines3"
                  :key="line.id"
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
            In order to understand patterns across time monitor different
            issues, governments and organizations collect data every year to
            understand the trajectory of the region.
          </p>
        </div>

        <div class="step">
          <p class="fs-4 mb-0">
            Unluckly sometime data is not updated regularly creating gaps in
            time series making it difficult to understand what’s happening or
            happened in a given time.
          </p>
        </div>

        <div class="step">
          <p class="fs-4 mb-0">
            Some indicators are rarely updated and the last data available are
            from years ago making it difficult for decision makers and citizen
            to understand how close or far the country is from the goal.
          </p>
        </div>
      </Scrollama>
    </div>
  </section>
</template>

<script>
import jsonData1 from '~/data/data-up-to-date/data-up-to-date-scrollytelling-positions-1.json'
import jsonData2 from '~/data/data-up-to-date/data-up-to-date-scrollytelling-positions-2.json'
import jsonData3 from '~/data/data-up-to-date/data-up-to-date-scrollytelling-positions-3.json'

export default {
  name: 'DataUpToDateScrollytellingComponent',

  data() {
    return {
      dots1: null,
      lines1: null,

      dots2: null,
      lines2: null,

      dots3: null,
      lines3: null,
    }
  },

  beforeMount() {
    this.dots1 = jsonData1.dots
    this.lines1 = jsonData1.lines

    this.dots2 = jsonData2.dots
    this.lines2 = jsonData2.lines

    this.dots3 = jsonData3.dots
    this.lines3 = jsonData3.lines
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
      ).add(
        {
          targets: this.$refs.dots1,
          opacity: 1,
          easing: 'easeInOutQuint',
          duration: 800,
        },
        300
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
            targets: this.$refs.dots1,
            opacity: 0,
            easing: 'easeOutQuint',
            duration: 600,
          },
          0
        )
        .add(
          {
            targets: this.$refs.dots2,
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
            targets: this.$refs.dots1,
            opacity: 0,
            easing: 'easeOutQuint',
            duration: 600,
          },
          0
        )
        .add(
          {
            targets: this.$refs.dots2,
            opacity: 0,
            easing: 'easeOutQuint',
            duration: 600,
          },
          0
        )
        .add(
          {
            targets: this.$refs.dots3,
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
            targets: this.$refs.dots1,
            opacity: 1,
            easing: 'easeInOutQuint',
            duration: 800,
          },
          300
        )
        .add(
          {
            targets: this.$refs.dots2,
            opacity: 0,
            easing: 'easeOutQuint',
            duration: 600,
          },
          0
        )
        .add(
          {
            targets: this.$refs.dots3,
            opacity: 0,
            easing: 'easeInOutQuint',
            duration: 600,
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
            targets: this.$refs.dots1,
            opacity: 0,
            easing: 'easeOutQuint',
            duration: 600,
          },
          0
        )
        .add(
          {
            targets: this.$refs.dots2,
            opacity: 1,
            easing: 'easeInOutQuint',
            duration: 800,
          },
          300
        )
        .add(
          {
            targets: this.$refs.dots3,
            opacity: 0,
            easing: 'easeInOutQuint',
            duration: 600,
          },
          0
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

// .dot {
//   width: 12px;
//   height: 12px;
//   border-radius: 50%;
//   position: absolute;
//
//   bottom: 0;
//   left: 10%;
// }

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
