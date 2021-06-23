<template>
  <section>
    <div class="container p-5 scrollytelling">
      <div class="scrollytelling__graphics">
        <div ref="barsContainer1" class="bars-container" data-step="1">
          <div class="bar" data-height="60%"></div>
        </div>
        <div ref="barsContainer2" class="bars-container" data-step="2">
          <div class="bar" data-height="70%"></div>
          <div class="bar" data-height="60%"></div>
          <div class="bar" data-height="40%"></div>
          <div class="bar" data-height="50%"></div>
          <div class="bar" data-height="55%"></div>
        </div>
        <div ref="barsContainer3" class="bars-container" data-step="3">
          <div class="bar" data-height="80%"></div>
          <div class="bar" data-height="55%"></div>
        </div>

        <div ref="yAxis" class="fs-7 text-light axis y-axis">
          <div class="axis__arrow"></div>
          <div class="axis__labels">
            <span>UNEMPLOYEMENT RATE</span>
          </div>
        </div>
        <div ref="xAxis" class="fs-7 text-light axis x-axis">
          <div class="axis__arrow"></div>

          <div class="axis__labels-container">
            <div ref="axisLabels1" class="axis__labels" data-step="1">
              <span>ALL POPULATION</span>
            </div>
            <div ref="axisLabels2" class="axis__labels" data-step="2">
              <span>18-25</span>
              <span>25-35</span>
              <span>35-45</span>
              <span>45-55</span>
              <span>+55</span>
            </div>
            <div ref="axisLabels3" class="axis__labels" data-step="3">
              <span>FEMALE</span>
              <span>MALE</span>
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
            If for example we look at an indicator such as “unemployement rate”,
            some countries report the data for the overall population. This
            representation is sometimes partial or biased.
          </p>
        </div>

        <div class="step">
          <p class="fs-4 mb-0">
            Other countries provide a much more defined picture of the
            phenomenon by providing the data disaggregated by age group, giving
            us a better understanding of the situation and providing better ways
            to reach everyone.
          </p>
        </div>

        <div class="step">
          <p class="fs-4 mb-0">
            Or by sex, highlighting differences and discrimantions based on
            gender.
          </p>
        </div>
      </Scrollama>
    </div>
  </section>
</template>

<script>
export default {
  name: 'DataDisaggregationScrollytellingComponent',

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
          targets: this.$refs.axisLabels1,
          opacity: 1,
          easing: 'easeOutQuint',
          duration: 1000,
        },
        0
      )

      this.$refs.barsContainer1.children?.forEach((el) => {
        tl.add(
          {
            targets: el,
            height: el.dataset.height,
            easing: 'easeOutQuint',
            duration: 1000,
          },
          0
        )
      })
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
            targets: this.$refs.axisLabels1,
            opacity: 0,
            easing: 'easeOutQuint',
            duration: 800,
          },
          0
        )
        .add(
          {
            targets: this.$refs.axisLabels2,
            opacity: 1,
            easing: 'easeOutQuint',
            duration: 800,
          },
          0
        )

      this.$refs.barsContainer1.children?.forEach((el) => {
        tl.add(
          {
            targets: el,
            height: 0,
            opacity: 0,
            easing: 'easeOutQuint',
            duration: 800,
          },
          0
        )
      })

      this.$refs.barsContainer2.children?.forEach((el) => {
        tl.add(
          {
            targets: el,
            height: el.dataset.height,
            opacity: 1,
            easing: 'easeOutQuint',
            duration: 800,
          },
          400
        )
      })
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
            targets: this.$refs.axisLabels1,
            opacity: 0,
            easing: 'easeOutQuint',
            duration: 800,
          },
          0
        )
        .add(
          {
            targets: this.$refs.axisLabels2,
            opacity: 0,
            easing: 'easeOutQuint',
            duration: 800,
          },
          0
        )
        .add(
          {
            targets: this.$refs.axisLabels3,
            opacity: 1,
            easing: 'easeOutQuint',
            duration: 800,
          },
          0
        )

      this.$refs.barsContainer1.children?.forEach((el) => {
        tl.add(
          {
            targets: el,
            height: 0,
            opacity: 0,
            easing: 'easeOutQuint',
            duration: 800,
          },
          0
        )
      })

      this.$refs.barsContainer2.children?.forEach((el) => {
        tl.add(
          {
            targets: el,
            height: 0,
            opacity: 0,
            easing: 'easeOutQuint',
            duration: 800,
          },
          0
        )
      })

      this.$refs.barsContainer3.children?.forEach((el) => {
        tl.add(
          {
            targets: el,
            height: el.dataset.height,
            opacity: 1,
            easing: 'easeOutQuint',
            duration: 800,
          },
          400
        )
      })
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
            targets: this.$refs.axisLabels1,
            opacity: 1,
            easing: 'easeOutQuint',
            duration: 800,
          },
          0
        )
        .add(
          {
            targets: this.$refs.axisLabels2,
            opacity: 0,
            easing: 'easeOutQuint',
            duration: 800,
          },
          0
        )
        .add(
          {
            targets: this.$refs.axisLabels3,
            opacity: 0,
            easing: 'easeOutQuint',
            duration: 800,
          },
          0
        )

      this.$refs.barsContainer1.children?.forEach((el) => {
        tl.add(
          {
            targets: el,
            height: el.dataset.height,
            opacity: 1,
            easing: 'easeOutQuint',
            duration: 800,
          },
          400
        )
      })

      this.$refs.barsContainer2.children?.forEach((el) => {
        tl.add(
          {
            targets: el,
            height: 0,
            opacity: 0,
            easing: 'easeOutQuint',
            duration: 800,
          },
          0
        )
      })

      this.$refs.barsContainer3.children?.forEach((el) => {
        tl.add(
          {
            targets: el,
            height: 0,
            opacity: 0,
            easing: 'easeOutQuint',
            duration: 800,
          },
          0
        )
      })
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
            targets: this.$refs.axisLabels1,
            opacity: 0,
            easing: 'easeOutQuint',
            duration: 800,
          },
          0
        )
        .add(
          {
            targets: this.$refs.axisLabels2,
            opacity: 1,
            easing: 'easeOutQuint',
            duration: 800,
          },
          0
        )
        .add(
          {
            targets: this.$refs.axisLabels3,
            opacity: 0,
            easing: 'easeOutQuint',
            duration: 800,
          },
          0
        )

      this.$refs.barsContainer1.children?.forEach((el) => {
        tl.add(
          {
            targets: el,
            height: 0,
            opacity: 0,
            easing: 'easeOutQuint',
            duration: 800,
          },
          0
        )
      })

      this.$refs.barsContainer2.children?.forEach((el) => {
        tl.add(
          {
            targets: el,
            height: el.dataset.height,
            opacity: 1,
            easing: 'easeOutQuint',
            duration: 800,
          },
          400
        )
      })

      this.$refs.barsContainer3.children?.forEach((el) => {
        tl.add(
          {
            targets: el,
            height: 0,
            opacity: 0,
            easing: 'easeOutQuint',
            duration: 800,
          },
          0
        )
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.bars-container {
  padding: 0 45px;
  height: calc(100% - 29px);
  width: calc(100% - 29px);
  position: absolute;
  right: 0;

  display: grid;
  gap: 15px;
  align-items: flex-end;

  &[data-step='1'] {
    grid-template-columns: 1fr 150px 1fr;

    .bar {
      grid-column: 2/3;
      mask-image: url(~/assets/images/narrative/data-disaggregation/cuts-mask.svg);
      mask-repeat: no-repeat;
      mask-size: cover;
      mask-type: luminance;
    }
  }

  &[data-step='2'] {
    grid-template-columns: repeat(5, 1fr);
  }

  &[data-step='3'] {
    grid-template-columns: repeat(2, 1fr);
  }
}

.bar {
  background: #e5243b;
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
      content: '';
      border: solid $white;
      display: inline-block;
      padding: 3px;
      transform: rotate(-45deg);
      position: absolute;
      border-width: 1px 1px 0 0;
      top: 0;
      right: -3px;
    }
  }

  & .axis__labels {
    grid-template-rows: 1fr;
    height: calc(100% - 29px);
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
  }

  & .axis__labels-container {
    height: 18px;
  }

  & .axis__labels {
    gap: 15px;
    padding: 0 45px;
    width: calc(100% - 29px);
    align-self: flex-end;
    text-align: center;
    opacity: 0;
    position: absolute;
    right: 0;

    &[data-step='1'] {
      grid-template-columns: 1fr 150px 1fr;

      & span {
        grid-column: 2/3;
      }
    }

    &[data-step='2'] {
      grid-template-columns: repeat(5, 1fr);
    }

    &[data-step='3'] {
      grid-template-columns: repeat(2, 1fr);
    }
  }
}
</style>
