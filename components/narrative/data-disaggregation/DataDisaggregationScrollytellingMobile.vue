<template>
  <div>
    <narrative-break-text>
      <div class="d-flex flex-column">
        <img
          src="~/assets/images/narrative/data-disaggregation/scrollytelling-mobile/data-disaggregation-scrollm-step1.svg"
          alt="Data Disaggregation Scrollytelling Mobile Step 1"
          class="w-100 mb-6"
        />
        <p class="fs-4 mb-5">
          If for example we look at an indicator such as “unemployement rate”,
          some countries report the data for the overall population. This
          representation is sometimes partial or biased.
        </p>
        <img
          src="~/assets/images/narrative/data-disaggregation/scrollytelling-mobile/data-disaggregation-scrollm-step2.svg"
          alt="Data Disaggregation Scrollytelling Mobile Step 2"
          class="w-100 my-6"
        />
        <p class="fs-4 mb-5">
          Other countries provide a much more defined picture of the phenomenon
          by providing the data disaggregated by age group, giving us a better
          understanding of the situation and providing better ways to reach
          everyone.
        </p>
        <img
          src="~/assets/images/narrative/data-disaggregation/scrollytelling-mobile/data-disaggregation-scrollm-step3.svg"
          alt="Data Disaggregation Scrollytelling Mobile Step 3"
          class="w-100 my-6"
        />
        <p class="fs-4 mb-5">
          Or by sex, highlighting differences and discrimantions based on
          gender.
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
