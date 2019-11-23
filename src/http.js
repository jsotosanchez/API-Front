export async function fetchToServer(url, context) {
  const data = await fetch(url, {
    headers: {
      'X-Custom-User': JSON.stringify(context.estado)
    }
  });
  if (data.status >= 400) {
    throw new Error(await data.json());
  }
  return data;
}
