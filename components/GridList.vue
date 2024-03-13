<script setup lang="ts">
const props = defineProps({
  data: {
    type: Array as PropType<any[]>,
    required: true
  },
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
        <p class="head_subtitle">Ceci est un sous-titre.</p>
      </div>
      <ul class="list">
        <li v-for="(item, index) of data" :key="index" class="item">
          <div class="item_head">
            <div>
              <h4 class="item_title">{{ item.description }}</h4>
              <small v-if="item.lieu">{{ item.lieu }}</small>
            </div>
            <span v-if="item.credits" class="item_price">{{ item.credits }}€</span>
            <span v-else class="item_price">{{ new Date(item.date_debut).toLocaleDateString() }}</span>
          </div>
          <p v-if="item.details" class="item_description">{{ item.details }}</p>
          <p v-else class="item_description">{{ item.description }}</p>
          <button class="item_cta">Voir</button>
        </li>
      </ul>
    </div>
  </section>
</template>
