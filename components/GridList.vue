<script setup lang="ts">
const props = defineProps({
  type: {
    type: String as PropType<'offers' | 'events'>,
    default: 'offers'
  }
})

const title = computed(() => (props.type === 'offers' ? 'Offers' : 'Events'))
</script>

<template>
  <section class="grid">
    <div class="wrapper">
      <h2 class="title">{{ title }}</h2>
      <ul class="list">
        <li v-for="(item, index) of 6" class="item">
          <div class="item_head">
            <h4 class="item_title">La Poste</h4>
            <span class="item_price">99.95€</span>
          </div>
          <p class="item_description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eum sunt nihil illo vel odio id distinctio maxime
            inventore.
          </p>
          <button class="item_cta">View</button>
        </li>
      </ul>
    </div>
  </section>
</template>
