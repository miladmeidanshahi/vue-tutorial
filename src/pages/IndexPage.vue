<template>
  <q-page>
    <q-carousel
      animated
      v-model="slide"
      arrows
      navigation
      infinite
    >
      <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
    </q-carousel>

    <home-widgets></home-widgets>

    <!-- <show-data
      v-model:message="message"
      v-model:username="username"
      title="new title"
    /> -->

    <banner-status>
      <template #upper-message>
        این پیام از طریق اسلات  بیرونی نمایش داده میشود <q-btn label="بستن" color="red" />
      </template>

      <template #inner-message>
        این پیام از طریق اسلات داخلی نمایش داده میشود <q-btn label="بستن" color="red" />
      </template>
    </banner-status>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

// import ShowData from 'components/ShowData.vue'
import HomeWidgets from 'components/HomeWidgets.vue'
import BannerStatus from 'components/BannerStatus.vue'

const slide = ref(1)
// const message = ref('Hello World!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
// const username = ref('Evan You')
</script>
