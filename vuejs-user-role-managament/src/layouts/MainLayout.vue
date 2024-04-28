<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Quasar App </q-toolbar-title>

        <q-btn flat @click="logout">Logout</q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import signout from "src/firebase/firebase-signout";
import { useRouter } from "vue-router";

const router = useRouter();

const logout = () => {
  signout().then(() => {
    router.push("/login");
  });
};
</script>
