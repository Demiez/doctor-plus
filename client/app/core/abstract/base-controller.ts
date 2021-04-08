import axios, { AxiosResponse } from 'axios';

export default class BaseController {
  /**
   * Send GET request
   * @param uri
   * @param signal
   */
  public async sendGetRequest<T>(uri: string, signal: AbortSignal): Promise<T> {
    try {
      const response = await fetch(uri, {
        method: 'GET',
        signal,
      });

      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Send GET request with Auth header
   * @param uri
   * @param credentials
   * @param signal
   */
  public async sendGetRequestWithAuth(uri: string, credentials: any = {}, signal: AbortSignal) {
    try {
      const response = await fetch(uri, {
        method: 'GET',
        signal,
        // prettier-ignore
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t,
        },
      });

      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Send POST request
   * @param uri
   * @param body
   */
  public async sendPostRequest<T>(uri: string, body: T, credentials: boolean = false): Promise<AxiosResponse<T>> {
    const result = await axios.post(uri, body, {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: credentials,
    });

    return result;

    // try {
    //   const response = await fetch(uri, {
    //     method: 'POST',
    //     // prettier-ignore
    //     headers: {
    //       'Accept': 'application/json',
    //       'Content-Type': 'application/json',
    //     },
    //     credentials: credentials ? 'include' : null,
    //     body: JSON.stringify(body),
    //   });

    //   return await response.json();
    // } catch (err) {
    //   throw new Error();
    // }
  }

  /**
   * Send PUT request
   * @param uri
   * @param body
   * @param credentials
   * @param signal
   */
  public async sendPutRequestWithAuth(uri: string, body: any = {}, credentials: any = {}, signal: AbortSignal) {
    try {
      const response = await fetch(uri, {
        method: 'PUT',
        signal,
        // prettier-ignore
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t,
        },
        body: JSON.stringify(body),
      });

      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Send DELETE request
   * @param uri
   * @param body
   * @param credentials
   * @param signal
   */
  public async sendDeleteRequestWithAuth(uri: string, credentials: any = {}) {
    try {
      const response = await fetch(uri, {
        method: 'DELETE',
        // prettier-ignore
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + credentials.t,
        },
      });

      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }
}
