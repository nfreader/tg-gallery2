export default {
  methods: {
    fixUpServerNames(server) {
      if (server == "bagil") {
        return "basil";
      }
      if (server == "sybil2") {
        return "manuel";
      }
      return server;
    },
  },
};
