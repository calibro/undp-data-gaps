<template>
  <div>
    <narrative-break-text>
      <div class="d-flex flex-column">
        <img
          src="~/assets/images/narrative/data-availability/step1.svg"
          alt="Step 1"
          class="w-100 mb-6"
        />
        <p class="fs-4 mb-5">
          The 2030 Agenda for Sustainable Development, adopted by all United
          Nations Member States in 2015, provides a shared blueprint for peace
          and prosperity for people and the planet, now and into the future.
        </p>
        <p class="fs-4 mb-5">
          At its heart are the 17 Sustainable Development Goals (SDGs), which
          are an urgent call for action by all countries.
        </p>
        <p class="fs-4 mb-5">
          Each SDG is tracked and monitored with different indicators that are
          common across countries. Methodology and standards to collect the data
          are established and they are available.
        </p>
        <img
          src="~/assets/images/narrative/data-availability/step2.svg"
          alt="Step 2"
          class="w-100 my-6"
        />
        <p class="fs-4 mb-5">
          Unluckly some countries in the Arab World don’t provide data for all
          the indicators for many reasons.
        </p>
        <p class="fs-4 mb-5">
          In the Arab region, data gaps make it difficult to monitor development
          impact on a society as a whole.
        </p>
        <img
          src="~/assets/images/narrative/data-availability/step3.svg"
          alt="Step 3"
          class="w-100 my-6"
        />
        <p class="fs-4 mb-5">
          Some countries don’t collect enough data about the enviroment and the
          sustainable development of their cities and communities.
        </p>
        <img
          src="~/assets/images/narrative/data-availability/step4.svg"
          alt="Step 4"
          class="w-100 my-6"
        />
        <p class="fs-4 mb-5">
          Other countries fail in representing social inequalities or indicators
          about their fight against poverty and discrimination.
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
