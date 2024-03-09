import { API_DOMAIN, API_PASSWORD, HTTPS_API_PORT, HTTP_API_PORT } from "./const";
import md5 from 'md5';

export const mapDict = <T, U>(
  dict: Record<string, T>,
  handler: (el: T) => U
) => {
  const result: Record<string, U> = {};
  for(const key in dict) result[key] = handler(dict[key]);
  return result;
}

export const createXAuth = (password: string, time = new Date()) => md5(
  password + '_' +
  time.getUTCFullYear() +
  (time.getUTCMonth() + 1).toString().padStart(2, '0') + 
  time.getUTCDate().toString().padStart(2, '0'));

export const apiFetch = async (
  action: string, params?: Record<string, any>
): Promise<any> => {
  console.log(action, params);
  const url = (
    `${location.protocol}//${API_DOMAIN}:` +
    (
      location.protocol.includes('s') ?
      HTTPS_API_PORT : HTTP_API_PORT));
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'X-Auth': createXAuth(API_PASSWORD),
      'Content-Type': 'application/json' },
    body: JSON.stringify({ action, params })
  });
  
  if(res.status === 200) {
    return res.json().then(({ result }) => result);
  } else {
    throw await res.text();
  }
}