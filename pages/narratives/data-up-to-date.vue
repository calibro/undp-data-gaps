<template>
  <div>
    <narrative-header
      chapter-number="3"
      title="Why is it important to have up-to-date statistic?"
      scroll-into-element-id="scroll-into-target"
    >
      <div style="background: black; height: 100%; width: 100%"></div>
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

    <section class="p-5 bg-dark text-light vh-100">
      <h1>Data Viz here</h1>
    </section>
  </div>
</template>

<script>
import NarrativeHeader from '~/components/narrative/NarrativeHeader'
import NarrativeBreakText from '~/components/narrative/NarrativeBreakText'
import DataUpToDateScrollytelling from '~/components/narrative/data-up-to-date/DataUpToDateScrollytelling'

export default {
  name: 'DataUpToDatePage',

  components: {
    NarrativeHeader,
    NarrativeBreakText,
    DataUpToDateScrollytelling,
  },
}
</script>

<style lang="scss" scoped></style>
