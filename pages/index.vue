<script setup lang="ts">
const email = ref<string | undefined>()
const password = ref<string | undefined>()

const validate = () => {
  const errors = []
  if (!email.value) errors.push({ path: 'email', message: 'Required' })
  if (!password.value) errors.push({ path: 'password', message: 'Required' })
  return errors
}

async function onSubmit(event: Event) {
  const errors = validate()
  if (errors.length > 0) {
    // handle errors
    console.error(errors)
  } else {
    // Do something with data
    console.log({ email: email.value, password: password.value })
  }
}
</script>

<template>
  <!-- <form @submit="onSubmit">
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Submit</button>
  </form> -->
  <Auth />
</template>
