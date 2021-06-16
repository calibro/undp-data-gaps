<template>
  <header class="position-relative bg-dark">
    <div
      class="
        d-flex
        flex-column
        align-items-start
        p-3 p-lg-5
        py-5 py-lg-6
        text-light
        h-100
      "
    >
      <div
        class="
          border-bottom border-top border-light
          py-5
          mb-4
          header__title-container
        "
      >
        <h1 class="display-0 m-0 header__title">
          Data Availability and Data Gaps in the Arab Region
        </h1>

        <img
          src="~/assets/images/dots.svg"
          alt="Dots"
          class="header__graphic"
        />
      </div>

      <span class="fs-4 text-secondary">
        Bridging the gaps to focus on what matters the most.
      </span>
    </div>
  </header>
</template>

<script>
export default {
  name: 'IndexPage',

  transition: 'fade',
}
</script>

<style lang="scss" scoped>
header {
  min-height: 100vh;
}

.header__title-container {
  display: grid;
  grid-template-columns: minmax(700px, 2fr) 1fr;
  gap: ($spacer * 6);

  @include media-breakpoint-down(xl) {
    grid-template-columns: 1fr;
    gap: ($spacer * 4);
  }
}

.header__graphic {
  width: 100%;
  max-width: 430px;
  justify-self: flex-end;
}
</style>
