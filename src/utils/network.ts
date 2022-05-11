async function FetchApi(
  url: Request | string,
  data: any,
  requestType: REQUEST_TYPE,
  raw
) {
  const response = await fetch(url, {
    method: requestType, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'allow-cross-origin': '*',
      'Content-Type': 'application/json',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data),
  });
  return raw ? response : response.json();
}

export async function postData(
  url: Request | string = '',
  data: any = {},
  raw = false
) {
  return FetchApi(url, data, 'POST', raw);
}

export async function putData(
  url: Request | string = '',
  data: any = {},
  raw = false
) {
  return FetchApi(url, data, 'PUT', raw);
}

export async function deleteData(
  url: Request | string = '',
  data: any = {},
  raw = false
) {
  return FetchApi(url, data, 'DELETE', raw);
}

// eslint-disable-next-line @typescript-eslint/naming-convention
type REQUEST_TYPE = 'POST' | 'PUT' | 'GET' | 'DELETE';

export async function postForm(url, data) {
  return fetch(url, {
    method: 'POST',
    body: data,
    headers: {
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
