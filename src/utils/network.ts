import { ParsedUrlQuery } from 'querystring';
import { GetServerSidePropsContext } from 'next';
import { getToken } from 'next-auth/jwt';

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

export const NetworkStatus = {
  AUTHORISED: {
    props: {},
  },
  UNAUTHORISED: {
    redirect: {
      destination: '/401',
      permanent: false,
    },
  },
  LOGIN_PAGE: {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  },
  NOT_FOUND: {
    notFound: true,
  },
  INTERNAL_SERVER_ERROR: {
    redirect: {
      destination: '/500',
      permanent: false,
    },
  },
  IS_PRODUCTION: process.env.NODE_ENV === 'production',
};


export async function checkIfLoggedIn(
  context: GetServerSidePropsContext<ParsedUrlQuery, string | false | object>
): Promise<boolean> {
  const { req } = context;
  const secret = process.env.JWT_SECRET;
  const token = await getToken({
    req,
    secret,
    raw: false,
    secureCookie: NetworkStatus.IS_PRODUCTION,
  });
  if (!token) return false;
  return true;
}

export async function grantIfLogin(
  context: GetServerSidePropsContext<ParsedUrlQuery, string | false | object>
) {
  return (await checkIfLoggedIn(context))
    ? NetworkStatus.AUTHORISED
    : NetworkStatus.LOGIN_PAGE;
}
