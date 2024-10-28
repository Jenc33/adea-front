<script setup>
import User from '../components/user/User.vue'
</script>

<template>
  <main>
    <User :tipo="2" :user="$route.params.login"/>
  </main>
</template>