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
          In order to understand patterns across time monitor different issues,
          governments and organizations collect data every year to understand
          the trajectory of the region.
        </p>
        <img
          src="~/assets/images/narrative/data-up-to-date/scrollytelling-mobile/data-up-to-date-scrollm-step2.svg"
          alt="Data Up to Date Scrollytelling Mobile Step 2"
          class="w-100 my-6"
        />
        <p class="fs-4 mb-5">
          Unluckily sometime data is not updated regularly creating gaps in time
          series making it difficult to understand what’s happening or happened
          in a given time.
        </p>
        <img
          src="~/assets/images/narrative/data-up-to-date/scrollytelling-mobile/data-up-to-date-scrollm-step3.svg"
          alt="Data Up to Date Scrollytelling Mobile Step 3"
          class="w-100 my-6"
        />
        <p class="fs-4 mb-5">
          Some indicators are rarely updated and the last data available are
          from years ago making it difficult for decision makers and citizen to
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
