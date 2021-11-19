<template>
  <div>
    <narrative-header
      chapter-number="2"
      title="Why is it important to have disaggregated data?"
      scroll-into-element-id="scroll-into-target"
    >
      <div class="narrative-header__image"></div>
    </narrative-header>

    <narrative-break-text id="scroll-into-target">
      <p class="fs-4 mb-5">
        The overarching principle of the 2030 Agenda for Sustainable Development
        – “leave no one behind” – calls for more granular and disaggregated
        data, stating that “SDG Indicators should be disaggregated, where
        relevant, by income, sex, age, race, ethnicity, migratory status,
        disability and geographic location, or other characteristics. For
        example, to ensure that the poorest of the poor are being reached, data
        should be distributed by income distribution.
      </p>
    </narrative-break-text>

    <mq-layout mq="xxl+">
      <client-only>
        <data-disaggregation-scrollytelling v-if="defer(2)" />
      </client-only>
    </mq-layout>
    <mq-layout :mq="['sm', 'md', 'lg', 'xl']">
      <data-disaggregation-scrollytelling-mobile />
    </mq-layout>

    <narrative-break-text>
      <p class="fs-4 mb-5">
        Improving data disaggregation is fundamental for the full implementation
        of the SDG indicator framework to fulfil the ambition of the 2030 Agenda
        for Sustainable of leaving no one behind. Explore the data to understand
        which countries and which indicators provide disaggregated data and
        where the gaps are.
      </p>
    </narrative-break-text>

    <mq-layout mq="xxl+">
      <section class="bg-dark text-light vh-100 data-viz">
        <div
          class="
            border-top border-bottom border-secondary
            px-5
            py-4
            d-flex
            justify-content-between
          "
        >
          <h2 class="m-0">
            Disaggregated data availability in the Arab Region
          </h2>
          <div class="select-container">
            <label for="select-element">Disaggregation by</label>
            <select
              id="select-element"
              v-model="disaggregation"
              class="form-select"
              name="disaggregation"
            >
              <option value="Sex">Sex</option>
              <option value="Education">Education</option>
              <option value="Age">Age</option>
              <option value="Disabilities">Disabilities</option>
            </select>
          </div>
        </div>

        <div class="px-5 py-4 pb-0">
          <data-disaggregation-viz
            v-if="defer(3)"
            :disaggregation="disaggregation"
          />
        </div>

        <div class="px-5 py-4 d-flex" style="margin-left: 204px">
          <div class="d-flex align-items-center me-5">
            <div class="me-3 viz-caption viz-caption--full"></div>
            <h5 class="m-0">Available with disaggregation</h5>
          </div>
          <div class="d-flex align-items-center me-5">
            <div class="me-3 viz-caption viz-caption--masked"></div>
            <h5 class="m-0">Available without disaggregation</h5>
          </div>
          <div class="d-flex align-items-center">
            <div class="me-3 viz-caption"></div>
            <h5 class="m-0">Not available</h5>
          </div>
        </div>
      </section>
    </mq-layout>
    <mq-layout :mq="['sm', 'md', 'lg', 'xl']">
      <section class="bg-dark text-light w-100 data-viz-mobile">
        <div class="selectSticky bg-dark">
          <div
            class="
              border-top border-secondary
              px-3 px-lg-5
              py-4
              d-flex
              flex-column
            "
          >
            <h2 class="mb-4">
              Disaggregated data availability in the Arab Region
            </h2>
            <div class="select-container">
              <label for="select-element">Disaggregation by</label>
              <select
                id="select-element"
                v-model="disaggregation"
                class="form-select"
                name="disaggregation"
              >
                <option value="Sex">Sex</option>
                <option value="Education">Education</option>
                <option value="Age">Age</option>
                <option value="Disabilities">Disabilities</option>
              </select>
            </div>
          </div>

          <div class="px-3 px-lg-5 py-2 d-flex flex-column">
            <div class="d-flex align-items-center mb-1">
              <div class="me-3 viz-caption viz-caption--full"></div>
              <h6 class="m-0">Available with disaggregation</h6>
            </div>
            <div class="d-flex align-items-center mb-1">
              <div class="me-3 viz-caption viz-caption--masked"></div>
              <h6 class="m-0">Available without disaggregation</h6>
            </div>
            <div class="d-flex align-items-center">
              <div class="me-3 viz-caption"></div>
              <h6 class="m-0">Not available</h6>
            </div>
          </div>

          <div class="px-4 d-flex align-items-center justify-content-end">
            <div class="me-1">scroll</div>
            <img
              src="~/assets/images/icons/arrow_down.svg"
              alt="arrow icon"
              style="transform: rotate(-90deg)"
            />
          </div>
        </div>

        <div class="w-100 overflow-scroll">
          <div
            class="px-3 px-lg-5 py-1 py-lg-5"
            style="width: 2000px; height: 1200px"
          >
            <data-disaggregation-viz
              v-if="defer(3)"
              :disaggregation="disaggregation"
            />
          </div>
        </div>
      </section>
    </mq-layout>
  </div>
</template>

<script>
import Defer from '~/mixins/defer.mixin.js'

import NarrativeHeader from '~/components/narrative/NarrativeHeader'
import NarrativeBreakText from '~/components/narrative/NarrativeBreakText'
import DataDisaggregationScrollytelling from '~/components/narrative/data-disaggregation/DataDisaggregationScrollytelling'
import DataDisaggregationScrollytellingMobile from '~/components/narrative/data-disaggregation/DataDisaggregationScrollytellingMobile'
import DataDisaggregationViz from '~/components/narrative/data-disaggregation/DataDisaggregationViz'

export default {
  name: 'DataDisaggregationPage',

  components: {
    NarrativeHeader,
    NarrativeBreakText,
    DataDisaggregationScrollytelling,
    DataDisaggregationScrollytellingMobile,
    DataDisaggregationViz,
  },

  mixins: [Defer()],

  transition: 'fade',

  data() {
    return {
      disaggregation: 'Sex',
    }
  },
}
</script>

<style lang="scss" scoped>
.narrative-header__image {
  height: 100%;
  width: 100%;
  background-image: url('~assets/images/narrative/data-disaggregation/data-disaggregation-header.png');
  background-size: contain;
  background-repeat: no-repeat;
  background-position: top right;
}

.data-viz {
  display: grid;
  grid-template-rows: min-content 1fr min-content;
}

.data-viz-mobile {
  display: grid;
  grid-template-rows: min-content min-content 1fr;
}

.select-container {
  display: grid;
  grid-template-columns: max-content max-content;
  align-items: center;
  gap: 15px;
}

.viz-caption {
  height: 30px;
  width: 12px;
  border: solid 1px rgb(64, 64, 64);
}

.viz-caption--full {
  background: white;
}

.viz-caption--masked {
  background: white;
  background-image: url(~/assets/images/narrative/data-disaggregation/cuts-mask.svg);
  background-repeat: no-repeat;
  background-size: cover;
}

.selectSticky {
  position: sticky;
  top: 60px;
  z-index: 11;
}
</style>
