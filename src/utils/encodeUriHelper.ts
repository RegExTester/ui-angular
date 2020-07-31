export class EncodeUriHelper {
  /** encode string to Base64Url format (RFC7515) */
  encodeBase64(str: string): string {
    let result = '';
    try {
      result = btoa(
        encodeURIComponent(str)
          .replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode(parseInt('0x' + p1, 16)))
      ).replace(/\+/ig, '-').replace(/\//ig, '_').replace(/=/ig, '');
    } catch (err) {
      console.log(err);
    }
    return result;
  }

  /** decode string from Base64Url format (RFC7515) */
  decodeBase64(str: string): string {
    let result = '';
    try {
      result = decodeURIComponent(
        atob(str.replace(/-/ig, '+').replace(/_/ig, '/')).split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
    } catch (err) {
      console.log(err);
    }
    return result;
  }
}
