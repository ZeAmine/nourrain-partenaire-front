<script setup lang="ts">
const offers = ref([])
const events = ref([])

const fetchData = async (url: string, dataRef: any) => {
  const { data }: any = await useFetch(url, {
    method: 'get',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include'
  })

  if (data.value) {
    dataRef.value = data.value
  }
}

onMounted(async () => {
  await fetchData('http://localhost:5001/protected/offers', offers)
  await fetchData('http://localhost:5001/protected/events', events)
})
</script>

<template>
  <Hero />
  <GridList v-show="offers.length" :data="offers" type="offers" />
  <GridList v-show="events.length" :data="events" type="events" />
</template>
