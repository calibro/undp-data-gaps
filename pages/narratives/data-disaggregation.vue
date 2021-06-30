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

    <section class="p-5 bg-dark text-light vh-100">
      <h1>Data Viz here</h1>
    </section>
  </div>
</template>

<script>
import NarrativeHeader from '~/components/narrative/NarrativeHeader'
import NarrativeBreakText from '~/components/narrative/NarrativeBreakText'
import DataDisaggregationScrollytelling from '~/components/narrative/data-disaggregation/DataDisaggregationScrollytelling'

export default {
  name: 'DataDisaggregationPage',

  components: {
    NarrativeHeader,
    NarrativeBreakText,
    DataDisaggregationScrollytelling,
  },

  transition: 'fade',
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
</style>
