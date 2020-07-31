import { environment } from '../environments/environment';

declare var gtag: any;

const gaId = environment.googleAnalyticsId;
const prodMode = environment.production;

export class GtagHelper {
  updatePath(path: string) {
    gtag('config', gaId, {
      'page_path': path,
      'send_page_view': prodMode
    });
  }

  trackEvent(event: string, category: string, action: string, label: string) {
    gtag('event', event, {
      'event_category': category,
      'event_action': action,
      'event_label': label,
    });
  }
}
