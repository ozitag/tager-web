import 'isomorphic-unfetch';

import { ConstantMap, Nullable } from '@typings/common';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

const HttpMethods: ConstantMap<HttpMethod> = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
};

type BodyParam = object | FormData;
type QueryParams = { [key: string]: any };

class ApiService {
  configureHeaders(body?: BodyParam) {
    const headers = new Headers();

    const isFormData = body instanceof FormData;
    if (!isFormData) {
      headers.set('Content-Type', 'application/json');
    }

    headers.set('Accept', 'application/json');

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

  createRequest({
    url,
    method,
    body,
    fetchOptions,
  }: {
    url: string;
    method: HttpMethod;
    body?: BodyParam;
    fetchOptions?: RequestInit;
  }) {
    return new Request(url, {
      headers: this.configureHeaders(body),
      method,
      mode: 'cors',
      body: this.configureBody(body),
      ...fetchOptions,
    });
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
    const request = this.createRequest({ url, method, body, fetchOptions });

    return fetch(request).then(this.handleErrors.bind(this));
  }

  bindMethodToApi(method: HttpMethod) {
    return this.makeRequest.bind(this, method);
  }
}

const API_SERVICE = new ApiService();

export const get = API_SERVICE.bindMethodToApi(HttpMethods.GET);
export const post = API_SERVICE.bindMethodToApi(HttpMethods.POST);
export const put = API_SERVICE.bindMethodToApi(HttpMethods.PUT);
export const del = API_SERVICE.bindMethodToApi(HttpMethods.DELETE);

export default API_SERVICE;
