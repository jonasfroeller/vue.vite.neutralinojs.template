<script setup lang="ts">
import { os } from '@neutralinojs/lib'

function showMessage() {
  os.showMessageBox('Hello', 'From NeuVite!')
}
</script>

<template>
  <div class="container">
    <h1>Hello NeuVite ^_^</h1>
    <button @click="showMessage">
      Show Message (Works only in Neu window)
    </button>
  </div>
</template>

<style>
html, body {
  margin: 0;
  padding: 0;
}

.container {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
