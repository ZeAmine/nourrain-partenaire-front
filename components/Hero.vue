<script setup lang="ts"></script>

<template>
  <section class="hero">
    <div class="wrapper">
      <button class="button">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M22.83 12.99L11.83 2H2v9.83l10.99 10.99zM5.5 7C4.67 7 4 6.33 4 5.5S4.67 4 5.5 4S7 4.67 7 5.5S6.33 7 5.5 7"
          />
        </svg>
        <span class="button_text">Ajouter une offre</span>
      </button>
      <button class="button">
        <svg width="32" height="32" viewBox="0 0 24 24" class="button_icon">
          <path fill="currentColor" d="M7 14v-2h10v2zm0 4v-2h7v2zm-4 4V4h3V2h2v2h8V2h2v2h3v18zm2-2h14V10H5z" />
        </svg>
        <span class="button_text">Ajouter un évenement</span>
      </button>
    </div>
    <!-- <Modal /> -->
  </section>
</template>
