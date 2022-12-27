export const streamToPromise = (stream) => {
  return new Promise((res, rej) => {
    let data = "";

    stream
      .setEncoding("utf8")
      .on("data", (chunk) => (data += chunk))
      .on("end", () => res(data))
      .on("error", () => rej("Some error has occured"));
  });
};
