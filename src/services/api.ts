import 'isomorphic-unfetch';

import { ConstantMap, Nullable } from '@typings/common';
import { isBrowser } from '@utils/common';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const HttpMethods: ConstantMap<HttpMethod> = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

type BodyParam = object | FormData;
type QueryParams = { [key: string]: any };
type Headers = { [key: string]: any };

class ApiService {
  private accessToken: Nullable<string>;

  constructor() {
    this.accessToken = null;
  }

  setAccessToken(accessToken: Nullable<string>) {
    this.accessToken = accessToken;
  }

  configureHeaders(body?: BodyParam): Headers {
    const headers: { [key: string]: string } = {};

    const isFormData = isBrowser() && body instanceof FormData;
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    if (this.accessToken) {
      headers['Authorization'] = `JWT ${this.accessToken}`;
    }

    headers['Accept'] = 'application/json';

    return headers;
  }

  configureBody(body?: BodyParam) {
    if (!body) return undefined;

    if (body instanceof FormData) {
      return body;
    }

    return JSON.stringify(body);
  }

  getSearchParams(params?: QueryParams): string {
    if (!params || Object.keys(params).length === 0) return '';

    const searchParams = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) =>
      searchParams.append(key, value),
    );

    return `?${searchParams.toString()}`;
  }

  getRequestUrl(path = '', params?: QueryParams) {
    const searchParams = this.getSearchParams(params);
    return [process.env.REACT_APP_API_URL, path, searchParams]
      .filter(Boolean)
      .join('');
  }

  configureOptions({
    method,
    body,
    fetchOptions,
  }: {
    method: HttpMethod;
    body?: BodyParam;
    fetchOptions?: RequestInit;
  }): RequestInit {
    return {
      headers: this.configureHeaders(body),
      method,
      mode: 'cors',
      body: this.configureBody(body),
      ...fetchOptions,
    };
  }

  async getContent(response: Response) {
    const contentType = response.headers.get('content-type');

    if (contentType && contentType.startsWith('application/json')) {
      return response.json().catch(error => {
        /** empty json body will throw "SyntaxError: Unexpected end of input" */
        if (error instanceof SyntaxError) {
          return response.text();
        }
      });
    }

    return response.text();
  }

  async handleErrors(response: Response) {
    if (response.ok) {
      return this.getContent(response);
    }

    throw new Error(`Request error: ${response.statusText} ${response.status}`);
  }

  logRequest(res: Response, options: RequestInit): Response {
    const formattedLog = `${options.method} ${res.status} ${res.url}`;

    if (process.env.NODE_ENV === 'development') {
      if (!isBrowser()) {
        console.log(
          require('util').inspect(formattedLog, {
            colors: true,
          }),
        );
      } else {
        console.log(`%c ${formattedLog}`, 'color: green');
      }
    }

    return res;
  }

  async makeRequest(
    method: HttpMethod,
    {
      path,
      body,
      params,
      absoluteUrl,
      fetchOptions,
    }: {
      path?: string;
      body?: BodyParam;
      params?: QueryParams;
      absoluteUrl?: string;
      fetchOptions?: RequestInit;
    },
  ) {
    const url = absoluteUrl || this.getRequestUrl(path, params);
    const options = this.configureOptions({ method, body, fetchOptions });

    return fetch(url, options)
      .then(response => this.logRequest(response, options))
      .then(this.handleErrors.bind(this));
  }

  bindHttpMethod(method: HttpMethod) {
    return this.makeRequest.bind(this, method);
  }
}

const api = new ApiService();

export const get = api.bindHttpMethod(HttpMethods.GET);
export const post = api.bindHttpMethod(HttpMethods.POST);
export const put = api.bindHttpMethod(HttpMethods.PUT);
export const del = api.bindHttpMethod(HttpMethods.DELETE);

export default api;
