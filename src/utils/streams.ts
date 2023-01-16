export const streamToPromise = (
  stream: NodeJS.ReadableStream
): Promise<string> => {
  return new Promise((res, rej) => {
    let data = "";

    stream
      .setEncoding("utf8")
      .on("data", (chunk: string) => (data += chunk))
      .on("end", () => res(data))
      .on("error", () => rej("Some error has occured"));
  });
};
