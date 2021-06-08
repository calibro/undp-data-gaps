<template>
  <div>
    <narrative-header
      :chapter-number="1"
      title="Why is important to make data available in the Arab Region?"
    >
      <template #background>
        <div style="background: black; height: 100%; width: 100%"></div>
      </template>
    </narrative-header>
    <h1 id="narrative-content">
      Why is important to make data available in the Arab Region?
    </h1>
  </div>
</template>

<script>
import NarrativeHeader from '~/components/narrative/NarrativeHeader'

export default {
  name: 'DataAvailabilityPage',

  components: {
    NarrativeHeader,
  },
}
</script>

<style scoped></style>
