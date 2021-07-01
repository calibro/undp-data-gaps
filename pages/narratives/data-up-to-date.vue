<template>
  <div>
    <narrative-header
      chapter-number="3"
      title="Why is it important to have up-to-date statistic?"
      scroll-into-element-id="scroll-into-target"
    >
      <div class="narrative-header__image"></div>
    </narrative-header>

    <narrative-break-text id="scroll-into-target">
      <p class="fs-4 mb-5">
        Solving comple social, economical and enviromental issues require a deep
        understanding of multiple factors. Data without context is not
        information and doesn’t provide a clear picture of what’s happening
        around us.
      </p>
    </narrative-break-text>

    <data-up-to-date-scrollytelling />

    <narrative-break-text>
      <p class="fs-4 mb-5">
        Explore the visualization to understand which countries and which
        indicators are more updated and their temporal granularity.
      </p>
    </narrative-break-text>

    <section class="p-5 bg-dark text-light vh-100 data-viz">
      <div class="border-bottom border-secondary pb-4 data-viz__header">
        <h2>Number of data points per year</h2>
        <!-- <div class="disaggregation-select-container">
          <label for="disaggregation-select">SDG</label>
          <select
            id="disaggregation-select"
            v-model="disaggregation"
            class="form-select"
            name="disaggregation"
          >
            <option value="Sex">Sex</option>
            <option value="Education">Education</option>
            <option value="Age">Age</option>
            <option value="Disabilities">Disabilities</option>
          </select>
        </div> -->
      </div>
      <data-up-to-date-viz />
    </section>
  </div>
</template>

<script>
import NarrativeHeader from '~/components/narrative/NarrativeHeader'
import NarrativeBreakText from '~/components/narrative/NarrativeBreakText'
import DataUpToDateScrollytelling from '~/components/narrative/data-up-to-date/DataUpToDateScrollytelling'
import DataUpToDateViz from '~/components/narrative/data-up-to-date/DataUpToDateViz'

export default {
  name: 'DataUpToDatePage',

  components: {
    NarrativeHeader,
    NarrativeBreakText,
    DataUpToDateScrollytelling,
    DataUpToDateViz,
  },

  transition: 'fade',

  data() {
    return {
      disaggregation: 'Sex',
    }
  },
}
</script>

<style lang="scss" scoped>
.narrative-header__image {
  height: 100%;
  width: 100%;
  background-image: url('~assets/images/narrative/data-availability/header-test.webp');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
}

.data-viz {
  display: grid;
  grid-template-rows: min-content 1fr;
}

.data-viz__header {
  display: flex;
  justify-content: space-between;
}

.disaggregation-select-container {
  display: grid;
  grid-template-columns: max-content max-content;
  align-items: center;
  gap: 15px;
}
</style>
