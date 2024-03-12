<script setup lang="ts"></script>

<template>
  <div class="modal" data-layer="top">
    <div class="content">
      <div class="head">
        <h1 class="head_title">Ajouter une offre</h1>
        <button class="head_close">
          <svg width="32" height="32" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="m6.4 18.308l-.708-.708l5.6-5.6l-5.6-5.6l.708-.708l5.6 5.6l5.6-5.6l.708.708l-5.6 5.6l5.6 5.6l-.708.708l-5.6-5.6z"
            />
          </svg>
          <span>Fermer</span>
        </button>
      </div>
      <form class="form">
        <input type="text" placeholder="Nom" class="form_input" required />
        <textarea placeholder="Description" class="form_input" required />
        <input type="number" placeholder="Prix" class="form_input" required />
        <button class="form_button">Ajouter</button>
      </form>
    </div>
  </div>
</template>
