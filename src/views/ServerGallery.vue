<script lang="ts">
import mixins from "@/Mixins";
export default {
  mixins: [mixins],
  data() {
    return {
      loading: false,
      server: "",
      art: [],
    };
  },
  methods: {
    fetchArt() {
      this.loading = true;
      // fetch(`http://localhost/gallery/${this.server}?json=true`)
      fetch(
        `https://tgstation13.org/parsed-logs/${this.server}/data/paintings.json`
      )
        .then((res) => res.json())
        .then((res) => {
          // console.log(res);
          this.art = res.paintings;
          this.art.reverse();
          this.loading = false;
        });
    },
    paintingUrl(md5: string) {
      return `https://tgstation13.org/parsed-logs/${this.server}/data/paintings/images/${md5}.png`;
    },
    paintingBg(md5: string): string {
      const from = md5.slice(0, 6);
      const to = md5.slice(-6);
      // return `bg-gradient-to-b from-[#${from}] to-[#${to}]`;
      return `background: linear-gradient(13deg, #${from}, #${to});`;
    },
  },
  mounted() {
    this.server = mixins.methods.fixUpServerNames(this.$route.params.server);
    this.fetchArt();
  },
  created() {
    // watch the params of the route to fetch the data again
    this.$watch(
      () => this.$route.params,
      () => {
        this.server = mixins.methods.fixUpServerNames(
          this.$route.params.server
        );
        this.art = [];
        this.fetchArt();
      },
      // fetch the data when the view is created and the data is
      // already being observed
      { immediate: false }
    );
  },
};
</script>

<template>
  <div>
    <h1 class="font-thin text-2xl border-b border-gray-300 pb-1 block">
      Artwork from {{ server.charAt(0).toUpperCase() + server.slice(1) }}
    </h1>
    <h2 v-if="loading" class="text-xs font-bold pt-1">Loading...</h2>
    <div
      id="gallery"
      class="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 mt-2 w-full h-auto"
    >
      <router-link
        :to="{ name: 'artwork', params: { server: server, artwork: a.md5 } }"
        class="grid"
        v-for="a in art"
        :key="a.md5"
      >
        <figure
          class="rounded border border-gray-500 overflow-hidden relative artwork transition-all flex"
          :style="paintingBg(a.md5)"
        >
          <img
            :src="paintingUrl(a.md5)"
            class="w-full h-auto pixelart self-center"
            onerror="this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAWFJREFUWIXtljFLw0AUx/8nOoRgMxSHdCj9GpbMBQvN0G5ZLORT9Avol7BQlw6iDi1EcC7xUwilgxlKhlik4PI6xNOI5HKXVutwP7jl7vH+/9y9dxdAo9HsGSZaJCIAQL/dpDLJR0HIAICxfJlCA/12k+ZRDM+xlMTHswQNu4pRELLSBs7PTmkexTBeV0rinHXlGA27iuuHp1ydw6IknmPhJlhhffIGi9WlhBNawFia8BwL4bM4ttAAx2J1DO8fpWL9bgvviKViD2QNcAZ+D0QEu9P5HLxYB35PNZ26gYurW9Rc99tczXVBRLgc3v2uAf6lnJfJRLgug3QNAGk/E9EP4W1QMpA1kT2GbQwp1wA3sQtxoMQOiIRFN14epdoQSCs/ewyMsVJtqLwDvNWi6TQVxlf1l2lDaQMJLeB3W9KxBszdGBjPEhgAjpYmSPJ6rXyI8xdRxP9+jv/ih0Sj0eydDa1giJ5riyILAAAAAElFTkSuQmCC'"
          />
        </figure>
        <caption class="text-left w-full overflow-hidden self-end">
          <span
            class="block text-sm font-bold whitespace-nowrap truncate text-ellipsis"
            v-decodeHtml="a.title"
            >{{ a.title }}</span
          >
          <span class="block text-xs">by {{ a.creator_ckey }}</span>
        </caption>
      </router-link>
    </div>
  </div>
</template>
