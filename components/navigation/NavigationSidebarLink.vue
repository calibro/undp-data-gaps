<template>
  <div class="position-relative navigation-link">
    <nuxt-link
      :to="link"
      class="
        d-flex
        align-items-center
        justify-content-center
        border-top border-dark
        text-decoration-none text-reset
        display-6
        p-2
        navigation-link__number
      "
    >
      {{ chapterNumber }}
    </nuxt-link>

    <nuxt-link
      :to="link"
      class="
        bg-white
        border-top border-bottom border-end border-dark
        text-decoration-none text-reset
        display-6
        px-3
        py-2
        navigation-link__title
      "
    >
      {{ title }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'NavigationSidebarLink',

  props: {
    link: {
      type: String,
      required: true,
    },

    chapterNumber: {
      type: String,
      required: true,
    },

    title: {
      type: String,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.navigation-link:hover {
  & .navigation-link__title {
    display: flex;
  }
}

.navigation-link__number {
  width: $sidebar-width;
  height: $sidebar-width;
}

.navigation-link__title {
  position: absolute;
  bottom: 0;
  left: $sidebar-width;
  display: none;
  justify-content: center;
  align-items: center;
  min-height: $sidebar-width;
  max-width: calc(100vw - #{$sidebar-width});
  width: max-content;
  transform: translateY(1px);
}
</style>
