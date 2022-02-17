<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
import ServerListing from "@/components/ServerListing.vue";
</script>
<script lang="ts">
export default {
  components: {
    ServerListing,
  },
  data() {
    return {
      servers: [],
    };
  },
  methods: {
    async fetchServers() {
      fetch("https://tgstation13.org/dynamicimages/serverinfo.json")
        .then((res) => res.json())
        .then((res) => {
          delete res.refreshtime;
          // console.log(res);
          this.servers = res;
        });
    },
  },
  mounted() {
    this.fetchServers();
  },
};
</script>

<template>
  <aside class="bg-tgblue w-80 text-gray-300">
    <header class="mb-3 p-2">
      <h1 class="font-thin text-2xl border-b border-gray-300 pb-1 block">
        <router-link to="/"> TG Station Gallery Viewer</router-link>
      </h1>
      <h2 class="text-xs font-bold pt-1">Brought to you by Statbus</h2>
    </header>
    <ul>
      <server-listing
        v-for="(info, server) in servers"
        :key="server"
        :info="info"
        :server="server"
      />
    </ul>
  </aside>
  <main
    id="main"
    role="main"
    class="flex-1 flex flex-col overflow-x-scroll p-2 h-screen"
  >
    <router-view></router-view>
  </main>
</template>
