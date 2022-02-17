<script lang="ts">
import mixins from "@/mixins";
export default {
  mixins: [mixins],
  props: ["info", "server"],
  computed: {
    serverName() {
      return mixins.methods.fixUpServerNames(this.server);
    },
  },
};
</script>

<template>
  <li v-if="validServers.includes(server)">
    <router-link
      :to="{ name: 'gallery', params: { server: serverName } }"
      class="
        flex
        items-center
        gap-2
        px-2
        py-1
        hover:bg-blue-300 hover:text-black
        transition-all
        duration-75
        ease-out
        hover:ease-in
      "
      ><img
        :src="'/img/server_icons/' + serverName + '.png'"
        class="w-1/12 h-auto"
      /><span>{{ info.serverdata.servername }}</span>
    </router-link>
  </li>
</template>
