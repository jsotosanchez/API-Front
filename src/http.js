/**
 *
 * @param {string} url
 * @param {object} context
 */
export async function fetchToServer(url, context) {
  const data = await fetch(url, {
    headers: {
      'X-Custom-Documento': context.estado.documento,
      'X-Custom-TipoUsuario': context.estado.tipoUsuario
    }
  });
  if (data.status >= 400) {
    throw new Error(String(data.status));
  }
  return data.json();
}

/**
 *
 * @param {string} url
 * @param {object} body
 * @param {object} context
 */
export async function deleteToServer(url, body, context) {
  const data = await fetch(url, {
    method: 'DELETE',
    body: JSON.stringify(body),
    headers: {
      'X-Custom-Documento': context.estado.documento,
      'X-Custom-TipoUsuario': context.estado.tipoUsuario
    }
  });
  if (data.status >= 400) {
    return Promise.reject(new Error(String(data.status)));
  }
  return data;
}

export async function postToServer(url, body, context) {
  const isForm = body.__proto__.constructor === FormData;

  const headers = {
    'X-Custom-Documento': context.estado.documento,
    'X-Custom-TipoUsuario': context.estado.tipoUsuario
  };

  if (!isForm) {
    headers['Content-Type'] = 'application/json';
  }

  const data = await fetch(url, {
    method: 'POST',
    body: isForm ? body : JSON.stringify(body),
    headers
  });
  if (data.status >= 400) {
    return Promise.reject(new Error(String(data.status)));
  }
  return data;
}
