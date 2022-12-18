declare var gtag: any;

export class GtagHelper {
  trackPageView(url: string, pattern: string, text: string, options: number) {
    gtag('event', "page_view", {
      'page_location': url,
      'page_title': `${options} | ${pattern} | ${text}`,
      'pattern': pattern,
      'text': text,
      'options': options
    });
  }
}
