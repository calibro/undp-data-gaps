<template>
  <div
    ref="dataAvailabilityVizDetails"
    class="
      position-absolute
      text-dark
      vh-100
      bg-light
      end-0
      d-flex
      flex-column
      data-availability-viz-details
    "
  >
    <div class="p-4 d-flex align-items-start border-bottom border-dark">
      <div
        :style="{ backgroundColor: color }"
        class="
          rounded-circle
          flex-shrink-0
          d-flex
          justify-content-center
          align-items-center
          me-4
          mt-1
          sdg-icon
        "
      >
        <img :src="sdgIcon" :alt="label + '| UDNP'" />
      </div>
      <h5 class="m-0 me-4">
        <strong>{{ percentage }}%</strong> of the indicators for the
        <strong :style="{ color: color }">{{ label }}</strong> are available for
        <strong>{{ country }}</strong
        >.
      </h5>
      <button
        class="btn d-flex"
        title="Close details panel"
        @click="closeDetails"
      >
        <img src="~/assets/images/icons/close.svg" alt="Close Details" />
      </button>
    </div>

    <div class="p-4 overflow-scroll">
      <div class="d-flex justify-content-between mb-3">
        <span>INDICATORS</span>
        <span
          >(
          <img
            src="~/assets/images/icons/checkbox--checked.svg"
            alt="Indicator available"
            style="height: 0.95rem"
          />
          = AVAILABLE )</span
        >
      </div>
      <div>
        <div
          v-for="indicator in detailsData"
          :key="indicator.indicator_code"
          class="d-flex mb-3 align-items-start"
          :style="{ opacity: indicator.availabile === 'TRUE' ? 1 : 0.3 }"
        >
          <div
            class="me-4 d-flex align-items-center flex-shrink-0"
            style="width: 90px"
          >
            <img
              v-if="indicator.availabile === 'TRUE'"
              src="~/assets/images/icons/checkbox--checked.svg"
              alt="Indicator available"
              class="me-2"
            />
            <img
              v-else
              src="~/assets/images/icons/checkbox.svg"
              alt="Indicator available"
              class="me-2"
            />
            <span>{{ indicator.indicator_code }}</span>
          </div>
          <span>{{ getIndicatorLabel(indicator.indicator_code) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataAvailabilityVizDetailsComponent',

  data() {
    return {
      sdgCode: null,
      percentage: null,
      color: null,
      label: null,
      country: null,
      detailsData: null,
    }
  },

  computed: {
    sdgIcon() {
      if (!this.sdgCode) {
        return
      }

      return require(`~/assets/images/sdg-icons/sdg_icon-${this.sdgCode}.svg`)
    },
  },

  mounted() {
    this.$bus.$on('present-data-availability-viz-details', this.presentDetails)
    this.$bus.$on('close-data-availability-viz-details', this.closeDetails)
  },

  beforeDestroy() {
    this.$bus.$off('present-data-availability-viz-details', this.presentDetails)
    this.$bus.$off('close-data-availability-viz-details', this.closeDetails)
  },

  methods: {
    presentDetails({ percentage, label, data, goalsData }) {
      this.sdgCode = +data[0].sdg_code
      this.percentage = percentage
      this.color = this.$goals.find((el) => el.id === this.sdgCode).color
      this.label = `SDG ${this.sdgCode} - ${label}`
      this.country = data[0].country
      this.detailsData = data
      this.$options.goalsData = goalsData

      this.$refs.dataAvailabilityVizDetails.classList.add(
        'data-availability-viz-details--visible'
      )
    },

    closeDetails() {
      this.$refs.dataAvailabilityVizDetails.classList.remove(
        'data-availability-viz-details--visible'
      )
      this.$bus.$emit('close-data-availability-viz-details')
    },

    getIndicatorLabel(code) {
      return this.$options.goalsData.find((el) => el.indicator_code === code)
        .indicator_label
    },
  },
}
</script>

<style lang="scss" scoped>
.data-availability-viz-details {
  width: calc(100% / 3.5);
  transform: translateX(100%);
  transition: all 700ms cubic-bezier(0.23, 1, 0.32, 1); /* easeOutQuint */
}

.data-availability-viz-details--visible {
  transform: translateX(0);
}

.sdg-icon {
  width: 60px;
  height: 60px;

  & img {
    width: 100%;
    height: auto;
  }
}
</style>
