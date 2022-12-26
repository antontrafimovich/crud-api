export const handle = (server) => {
  server.on("request", (request, res) => {
    if (res.writableEnded) {
      return;
    }

    const url = new URL(request.url, `http://${request.headers.host}`);

    console.log("in error", url);

    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "some error" }));
  });

  return server;
};
