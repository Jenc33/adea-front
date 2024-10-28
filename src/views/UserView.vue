<script setup>
import User from '../components/user/User.vue'
</script>

<template>
  <main>
    <User :tipo="0" :user="$route.params.login" />
  </main>
</template>