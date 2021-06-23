<template>
  <div class="position-relative bg-white border-top border-dark">
    <nuxt-link
      :to="link"
      class="
        d-block
        text-decoration-none text-reset
        fs-4
        px-3 px-lg-5
        py-3
        navigation-link__title
      "
    >
      {{ title }}
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'NavigationLink',

  props: {
    link: {
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

<style lang="scss" scoped></style>
