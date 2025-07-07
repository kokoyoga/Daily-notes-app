const Hapi = require("@hapi/hapi");
const routes = require("./src/routes");

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"], // Mengizinkan semua origin
      },
    },
  });

  // GET route
  server.route(routes);

  await server.start();
  console.log(`server berjalan di ${server.info.uri}`);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
