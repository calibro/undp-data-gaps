<template>
  <div>
    <narrative-header
      chapter-number="1"
      title="Why is important to make data available in the Arab Region?"
      scroll-into-element-id="scroll-into-target"
    >
      <data-availability-header />
    </narrative-header>

    <narrative-break-text id="scroll-into-target">
      <p class="fs-4 mb-5">
        Data is everywhere. It helps us understand the complex phenomena that
        happen around us and it helps us framing problems and taking the right
        decisions. Citizens, organizations, companies, governments are both data
        producers and data consumers.
      </p>
      <p class="fs-4 mb-5">
        Their decisions are shaped by the information they receive. The data
        collected about them shape the perception of their struggles and their
        needs. By having access to data and effectively using knowledge
        resources, individuals, firms, and communities can improve their
        individual and collective well-being, thereby contributing to
        sustainable development.
      </p>
    </narrative-break-text>

    <data-availability-scrollytelling />

    <narrative-break-text>
      <p class="fs-4 mb-5">
        By monitoring data availabitlyand bridging the gaps we can focus on what
        matters the most to the society living in the arab reagion.
      </p>
      <p class="fs-4 mb-5">
        Explore the interactive visualization to discover gaps and see how
        countries are performing.
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
import DataAvailabilityHeader from '~/components/narrative/data-availability/DataAvailabilityHeader'
import DataAvailabilityScrollytelling from '~/components/narrative/scrollytellings/DataAvailabilityScrollytelling'

export default {
  name: 'DataAvailabilityPage',

  components: {
    NarrativeHeader,
    NarrativeBreakText,
    DataAvailabilityScrollytelling,
    DataAvailabilityHeader,
  },
}
</script>

<style lang="scss" scoped></style>
