<script setup lang="ts"></script>

<template>
  <section class="auth">
    <div class="block">
      <div class="wrapper">
        <div class="block_head">
          <h1>Connectez-vous</h1>
          <p>Entrez votre email et mot de passe pour vous connecter.</p>
        </div>
        <form action="/ma-page-de-traitement" class="block_form" @submit.prevent="onSubmit">
          <input type="email" placeholder="name@example.com" v-model="email" required />
          <input type="password" placeholder="************" v-model="password" required />
          <Button type="submit" text="Se connecter" />
        </form>
        <p class="block_text">
          By clicking continue, you agree to our
          <u>
            Terms <br />
            of Service
          </u>
          and <u>Privacy Policy</u>.
        </p>
        <!-- <Toasters name="valid" v-if="props.isSend">Email envoyé, regardez dans vos notifications !</Toasters> -->
        <!-- <Button @click="fetchData">Envoyer le mail</Button> -->
        <!-- <Toasters v-show="isError" name="caution">
        <p ref="toasterRef">Attention, votre addresse mail n'est pas correcte</p>
      </Toasters> -->
      </div>
    </div>
  </section>
</template>
