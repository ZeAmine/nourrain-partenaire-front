<script setup lang="ts">
const props = defineProps({
  type: {
    type: String as PropType<'login' | 'register'>,
    default: 'login'
  }
})

const title = computed(() => (props.type === 'login' ? 'Connectez-vous' : 'Inscrivez-vous'))
const action = computed(() => (props.type === 'login' ? 'connecter' : 'inscrire'))
const cta = computed(() => (props.type === 'login' ? 'Connexion' : 'Inscription'))

const email = ref<string | undefined>()
const password = ref<string | undefined>()
const passwordConfirm = ref<string | undefined>()

const validate = () => {
  const errors = []
  const regexEmail = /\S+@\S+\.\S+/

  if (!email.value || email.value.search(regexEmail) !== 0) {
    errors.push({ path: 'email', message: 'Invalid email' })
  }

  if (!password.value) {
    errors.push({ path: 'password', message: 'Required' })
  }

  if (props.type === 'register' && password.value !== passwordConfirm.value) {
    errors.push({ path: 'passwordConfirm', message: 'Passwords do not match' })
  }

  return errors.map((error) => {
    return error.message
  })
}

async function onSubmit() {
  const errors = validate()

  if (errors.length > 0) {
    return console.error(errors)
  }

  if (props.type === 'register') {
    fetchAuth(props.type, 'http://localhost:5001/auth/register', {
      name: 'test',
      prenom: 'test',
      adresse: 'test',
      telephone: 'test',
      email: email.value || '',
      password: password.value || ''
    })
  }

  if (props.type === 'login') {
    fetchAuth(props.type, 'http://localhost:5001/auth/login', {
      email: email.value || '',
      password: password.value || ''
    })
  }
}
</script>

<template>
  <section class="auth">
    <div class="block">
      <div class="wrapper">
        <div class="block_head">
          <h1>{{ title }}</h1>
          <p>Entrez votre email et mot de passe pour vous {{ action }}.</p>
        </div>
        <form class="block_form">
          <!-- <input type="text" placeholder="Nom" v-model.trim="email" required /> -->
          <input type="email" placeholder="Email" v-model.trim="email" required />
          <input type="password" placeholder="Mot de passe" v-model.trim="password" required />
          <input
            v-if="type === 'register'"
            type="password"
            placeholder="Confirmer mot de passe"
            v-model.trim="passwordConfirm"
            required
          />
          <button type="submit" @click.prevent="onSubmit">{{ cta }}</button>
        </form>
        <p class="block_text">
          By clicking continue, you agree to our <u> Terms of Service </u> <br />
          and <u>Privacy Policy</u>.
        </p>
      </div>
    </div>
  </section>
</template>
