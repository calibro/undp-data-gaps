<template>
  <div>
    <narrative-break-text>
      <div class="d-flex flex-column">
        <img
          src="~/assets/images/narrative/data-availability/scrollytelling-mobile/data-availability-scrollm-step1.svg"
          alt="Step 1"
          class="w-100 mb-6"
        />
        <p class="fs-4 mb-5">
          The 2030 Agenda for Sustainable Development, adopted by all United
          Nations Member States in 2015, provides a shared blueprint for peace
          and prosperity for people and the planet.
        </p>
        <p class="fs-4 mb-5">
          At its heart are the 17 Sustainable Development Goals (SDGs), which
          are integrated, indivisible and balance the three dimensions of
          sustainable development: the economic, social and environmental.
        </p>
        <p class="fs-4 mb-5">
          Each SDG is tracked and monitored with a set of indicators that are
          common across countries according to the global indicator framework.
          Methodology and standards to collect the data for all indicators are
          now available.
        </p>
        <img
          src="~/assets/images/narrative/data-availability/scrollytelling-mobile/data-availability-scrollm-step2.svg"
          alt="Step 2"
          class="w-100 my-6"
        />
        <p class="fs-4 mb-5">
          Tracking progress towards implementing the 17 SDGs should go hand in
          hand with measuring the statistical capacity of countries. Data
          availability at the indicator level helps us understand which
          dimensions of the three economic, social and environmental are least
          reported on, and which communities are left out when reporting on the
          efforts to implement the SDGs at the national, regional and global
          levels.
        </p>

        <img
          src="~/assets/images/narrative/data-availability/scrollytelling-mobile/data-availability-scrollm-step3.svg"
          alt="Step 3"
          class="w-100 my-6"
        />
        <p class="fs-4 mb-5">
          Some countries don’t collect enough data about the environment and the
          sustainable development of their cities and/r specific communities.
        </p>
        <img
          src="~/assets/images/narrative/data-availability/scrollytelling-mobile/data-availability-scrollm-step4.svg"
          alt="Step 4"
          class="w-100 my-6"
        />
        <p class="fs-4 mb-5">
          Other countries fail in reporting on social inequalities in rural
          areas and the gender disparity across many levels.
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
