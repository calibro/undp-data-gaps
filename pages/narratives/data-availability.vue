<template>
  <div>
    <narrative-header
      chapter-number="1"
      title="Why is important to make data available in the Arab Region?"
      scroll-into-element-id="scroll-into-target"
    >
      <template #background>
        <div style="background: black; height: 100%; width: 100%"></div>
      </template>
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

    <section class="bg-dark">
      <div class="container p-5 scrollytelling">
        <!-- <visual-line></visual-line> -->

        <div class="bg-primary scrollytelling__graphics">{{ currentStep }}</div>

        <Scrollama
          class="text-light scrollytelling__texts"
          :offset="0.35"
          @step-enter="stepEnterHandler"
          @step-exit="stepExitHandler"
        >
          <div class="step-1" data-step="a">
            <p class="fs-4 mb-5">
              The 2030 Agenda for Sustainable Development, adopted by all United
              Nations Member States in 2015, provides a shared blueprint for
              peace and prosperity for people and the planet, now and into the
              future.
            </p>
            <p class="fs-4 mb-5">
              At its heart are the 17 Sustainable Development Goals (SDGs),
              which are an urgent call for action by all countries.
            </p>
            <p class="fs-4 mb-0">
              Each SDG is tracked and monitored with different indicators that
              are common across countries. Methodology and standards to collect
              the data are established and they are available.
            </p>
          </div>

          <div class="step-2" data-step="b">
            <p class="fs-4 mb-5">
              Unluckly some countries in the Arab World don’t provide data for
              all the indicators for many reasons.
            </p>
            <p class="fs-4 mb-0">
              In the Arab region, data gaps make it difficult to monitor
              development impact on a society as a whole.
            </p>
          </div>

          <div class="step-3" data-step="c">
            <p class="fs-4 mb-0">
              Some countries don’t collect enough data about the enviroment and
              the sustainable development of their cities and communities.
            </p>
          </div>

          <div class="step-4" data-step="d">
            <p class="fs-4 mb-0">
              Other countries fail in representing social inequalities or
              indicators about their fight against poverty and discrimination.
            </p>
          </div>
        </Scrollama>
      </div>
    </section>

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

export default {
  name: 'DataAvailabilityPage',

  components: {
    NarrativeHeader,
    NarrativeBreakText,
  },

  data() {
    return {
      currentStep: null,
    }
  },

  methods: {
    stepEnterHandler({ element, index, direction }) {
      element.classList.add('current-step')
      this.currentStep = element.dataset.step
    },

    stepExitHandler({ element, index, direction }) {
      element.classList.remove('current-step')
    },
  },
}
</script>

<style lang="scss" scoped>
.scrollytelling {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: ($spacer * 6);
}

.scrollytelling__graphics {
  position: sticky;
  top: 15vh;
  height: 500px;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
}

.scrollytelling__texts {
  display: grid;
  grid-auto-rows: 1fr;
  row-gap: ($spacer * 12);
}

visual-line {
  position: fixed;
  width: 100%;
  height: 2px;
  background: white;
  top: 35vh;
}

.step-1,
.step-2,
.step-3,
.step-4 {
  // background: lightgray;
  min-height: 500px;
}

.current-step {
  color: orange;
}
</style>
