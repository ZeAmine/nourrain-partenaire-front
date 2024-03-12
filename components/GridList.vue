<script setup lang="ts">
const props = defineProps({
  type: {
    type: String as PropType<'offers' | 'events'>,
    default: 'offers'
  }
})

const title = computed(() => (props.type === 'offers' ? 'Offres' : 'Evénements'))
</script>

<template>
  <section class="grid">
    <div class="wrapper">
      <div class="head">
        <h2 class="head_title">{{ title }}</h2>
        <p class="head_subtitle">Top picks for you. Updated daily.</p>
      </div>
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
          <button class="item_cta">Voir</button>
        </li>
      </ul>
    </div>
  </section>
</template>
