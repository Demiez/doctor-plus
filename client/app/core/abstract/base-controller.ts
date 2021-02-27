export default class BaseController {
  /**
   * Send GET request
   * @param uri
   * @param signal
   */
  public async sendGetRequest(uri: string, signal: any): Promise<Response> {
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
   * Send POST request
   * @param uri
   * @param body
   */
  public async sendPostRequest(uri: string, body: any = {}): Promise<Response> {
    try {
      const response = await fetch(uri, {
        method: 'POST',
        headers: {
          // prettier-ignore
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      return await response.json();
    } catch (err) {
      console.log(err);
    }
  }
}
