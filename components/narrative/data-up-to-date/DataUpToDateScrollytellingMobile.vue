<template>
  <div>
    <narrative-break-text>
      <div class="d-flex flex-column">
        <img
          src="~/assets/images/narrative/data-up-to-date/scrollytelling-mobile/data-up-to-date-scrollm-step1.svg"
          alt="Data Up to Date Scrollytelling Mobile Step 1"
          class="w-100 mb-6"
        />
        <p class="fs-4 mb-5">
          While data for some indicators can be collected on a monthly,
          quarterly and annual basis, it is very expensive to collect annual
          data for some indicators, especially when trends tend not to change
          frequently.
        </p>
        <img
          src="~/assets/images/narrative/data-up-to-date/scrollytelling-mobile/data-up-to-date-scrollm-step2.svg"
          alt="Data Up to Date Scrollytelling Mobile Step 2"
          class="w-100 my-6"
        />
        <p class="fs-4 mb-5">
          However, it is crucial to collect timely data for some indicators,
          such as … And failing to do so affects the quality of policies.
        </p>
        <img
          src="~/assets/images/narrative/data-up-to-date/scrollytelling-mobile/data-up-to-date-scrollm-step3.svg"
          alt="Data Up to Date Scrollytelling Mobile Step 3"
          class="w-100 my-6"
        />
        <p class="fs-4 mb-5">
          Some indicators are rarely updated and the last data available are
          from years ago making it difficult for decision makers and citizens to
          understand how close or far the country is from the goal.
        </p>
      </div>
    </narrative-break-text>
  </div>
</template>

<script>
import NarrativeBreakText from '~/components/narrative/NarrativeBreakText'
export default {
  name: 'DataAvailabilityScrollytellingMobileComponent',

  components: {
    NarrativeBreakText,
  },
}
</script>

<style lang="scss" scoped>
img {
  align-self: center;
  max-width: 400px;
}
</style>
