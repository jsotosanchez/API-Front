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

export async function postToServer(url, body, context) {
  const data = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'X-Custom-User': JSON.stringify(context.estado)
    }
  });
  if (data.status >= 400) {
    throw new Error(await data.json());
  }
  return data;
}
