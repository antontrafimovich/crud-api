import { UserRepository } from "./repositories/index.js";
import store from "./store.js";

let userRepo;

store.onUpdate((state) => {
  userRepo = new UserRepository(state.db);
});

export const handle = (server) => {
  server.on("request", (request, res) => {
    const url = new URL(request.url, `http://${request.headers.host}`);

    if (!url.pathname.includes("api/users")) {
      return;
    }

    if (request.method === "GET" && url.pathname === "/api/users") {
      const users = userRepo.getAll();

      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          data: users,
        })
      );

      return;
    }

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        data: "Hello World!",
      })
    );
  });

  return server;
};
