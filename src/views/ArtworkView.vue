<script lang="ts">
import mixins from "@/Mixins";
export default {
  mixins: [mixins],
  data() {
    return {
      loading: false,
      art: [],
      artwork: Object,
      server: String,
      md5: String,
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
          console.log(res.paintings);
          this.artwork = res.paintings.find((obj: any) => obj.md5 === this.md5);
          this.art.reverse();
          this.loading = false;
        });
    },
    paintingUrl(md5: string) {
      return `https://tgstation13.org/parsed-logs/${this.server}/data/paintings/images/${md5}.png`;
    },
  },
  mounted() {
    this.server = mixins.methods.fixUpServerNames(this.$route.params.server);
    this.md5 = this.$route.params.artwork;
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
        this.md5 = this.$route.params.artwork;
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
  <div class="">
    <h1 class="font-thin text-2xl border-b border-gray-300 pb-1 px-4 block">
      <router-link
        class="link"
        :to="{ name: 'gallery', params: { server: server } }"
      >
        ≪ Back
      </router-link>
    </h1>
    <h2 v-if="loading" class="text-xs font-bold pt-1">Loading...</h2>

    <div class="grid grid-cols-2 mt-3 gap-4">
      <caption class="text-left">
        <div class="px-4 pb-5 sm:px-6">
          <h3 class="text-2xl leading-6 font-medium text-gray-900">
            {{ artwork.title }}
          </h3>
          <p class="mt-1 max-w-2xl text-lg text-gray-500">
            {{ artwork.creator_name }}
          </p>
        </div>
        <dl>
          <div
            class="bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Created by</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ artwork.creator_ckey }}
            </dd>
          </div>
          <div
            class="bg-white px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Created</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              During round {{ artwork.creation_round_id }} on {{ server }} at
              {{ artwork.creation_date }}
            </dd>
          </div>
          <div
            class="bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Medium</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ artwork.medium }}
            </dd>
          </div>
          <div
            class="bg-white px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Dimensions</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ artwork.width }} &times; {{ artwork.height }}
            </dd>
          </div>
          <div
            class="bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Tags</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              <span
                :key="tag"
                v-for="tag in artwork.tags"
                class="
                  px-2
                  inline-flex
                  text-xs
                  leading-5
                  font-semibold
                  rounded-full
                  bg-blue-100
                  text-blue-800
                  hover:text-blue-100 hover:bg-blue-800
                  mr-1
                "
                >{{ tag }}</span
              >
            </dd>
          </div>
          <div
            class="bg-white px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Patron</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ artwork.patron_ckey ? artwork.patron_ckey : "N/A" }}
            </dd>
          </div>
          <div
            class="bg-gray-50 px-2 py-3 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6"
          >
            <dt class="text-sm font-medium text-gray-500">Value</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
              {{ artwork.credit_value }} cr.
            </dd>
          </div>
        </dl>
      </caption>
      <figure class="w-1/2 flex self-center justify-self-center">
        <img
          :src="paintingUrl(artwork.md5)"
          class="w-full h-auto pixelart self-center justify-self-center"
          onerror="this.src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAWFJREFUWIXtljFLw0AUx/8nOoRgMxSHdCj9GpbMBQvN0G5ZLORT9Avol7BQlw6iDi1EcC7xUwilgxlKhlik4PI6xNOI5HKXVutwP7jl7vH+/9y9dxdAo9HsGSZaJCIAQL/dpDLJR0HIAICxfJlCA/12k+ZRDM+xlMTHswQNu4pRELLSBs7PTmkexTBeV0rinHXlGA27iuuHp1ydw6IknmPhJlhhffIGi9WlhBNawFia8BwL4bM4ttAAx2J1DO8fpWL9bgvviKViD2QNcAZ+D0QEu9P5HLxYB35PNZ26gYurW9Rc99tczXVBRLgc3v2uAf6lnJfJRLgug3QNAGk/E9EP4W1QMpA1kT2GbQwp1wA3sQtxoMQOiIRFN14epdoQSCs/ewyMsVJtqLwDvNWi6TQVxlf1l2lDaQMJLeB3W9KxBszdGBjPEhgAjpYmSPJ6rXyI8xdRxP9+jv/ih0Sj0eydDa1giJ5riyILAAAAAElFTkSuQmCC'"
        />
      </figure>
    </div>
  </div>
</template>
