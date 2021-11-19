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
          For example, we cannot talk about unemployment by simply looking at
          the national “unemployment rate”. Indicator 8.5.2 stipulates reporting
          on unemployment rate by sex, age and persons with disabilities.
        </p>
        <img
          src="~/assets/images/narrative/data-disaggregation/scrollytelling-mobile/data-disaggregation-scrollm-step2.svg"
          alt="Data Disaggregation Scrollytelling Mobile Step 2"
          class="w-100 my-6"
        />
        <p class="fs-4 mb-5">
          To design relevant policies, countries might need to look into
          unemployment rate by age, and the data might underscore the need to
          target the youth labor force and those actively seeking employment.
        </p>
        <img
          src="~/assets/images/narrative/data-disaggregation/scrollytelling-mobile/data-disaggregation-scrollm-step3.svg"
          alt="Data Disaggregation Scrollytelling Mobile Step 3"
          class="w-100 my-6"
        />
        <p class="fs-4 mb-5">
          In the Arab region, female youth unemployment rate is the highest in
          the world, and reporting on this indicator is key to expose
          discriminatory practices and structural biases in the economy.
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
