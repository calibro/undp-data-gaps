<template>
  <div>
    <narrative-header
      chapter-number="2"
      title="Why is it important to have disaggregated data?"
      scroll-into-element-id="scroll-into-target"
    >
      <div class="narrative-header__image"></div>
    </narrative-header>

    <narrative-break-text id="scroll-into-target">
      <p class="fs-4 mb-5">
        A central promise of the sustainable development goals (SDGs) is to
        leave no one behind, but the current indicators to measure progress
        sometimes don’t keep that promise. To leave no one behind means reaching
        the poorest of the poor, women, children, the elderly, indigenous
        people, migrants, people with disabilities, and other vulnerable groups.
      </p>
    </narrative-break-text>

    <data-disaggregation-scrollytelling />

    <narrative-break-text>
      <p class="fs-4 mb-5">
        Improving data disaggregation is fundamental for the full implementation
        of the SDG indicator framework to fulfil the ambition of the 2030 Agenda
        for Sustainable of leaving no one behind. Explore the data to understand
        which countries and which indicators provide disaggregated data and
        where the gaps are.
      </p>
    </narrative-break-text>

    <section class="p-5 bg-dark text-light vh-100 data-viz">
      <div class="border-bottom border-secondary pb-4 data-viz__header">
        <h2>Disaggregated data availability in the Arab Region</h2>
        <div class="disaggregation-select-container">
          <label for="disaggregation-select">Disaggregation by</label>
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
        </div>
      </div>
      <data-disaggregation-viz :disaggregation="disaggregation" />
    </section>
  </div>
</template>

<script>
import NarrativeHeader from '~/components/narrative/NarrativeHeader'
import NarrativeBreakText from '~/components/narrative/NarrativeBreakText'
import DataDisaggregationScrollytelling from '~/components/narrative/data-disaggregation/DataDisaggregationScrollytelling'
import DataDisaggregationViz from '~/components/narrative/data-disaggregation/DataDisaggregationViz'

export default {
  name: 'DataDisaggregationPage',

  components: {
    NarrativeHeader,
    NarrativeBreakText,
    DataDisaggregationScrollytelling,
    DataDisaggregationViz,
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
