import { Component, OnInit, OnDestroy, ElementRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Meta } from '@angular/platform-browser';
import { RegExTesterResult } from '../../model/regextesterresult.model';
import { EncodeUriHelper } from '../../utils/encodeUriHelper';
import { GtagHelper } from '../../utils/googleAnalyticsHelper';
import { CONFIG } from './regex.config';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-regex',
  standalone: true,
  templateUrl: './regex.component.html',
  styleUrls: ['./regex.component.css'],
  imports: [ CommonModule, FormsModule ],
  providers: [ EncodeUriHelper, GtagHelper ]
})
export class RegexComponent implements OnInit, OnDestroy {
  @ViewChild('tabReplace') tabReplace: ElementRef;
  CONFIG = CONFIG;

  routeSubscribe;
  debounceTimer;
  busy = false;

  expandMatchReult = {};

  engine = '';
  pattern = '';
  text = '';
  highlightText = '';
  replace = '';
  options = Object.values(CONFIG.REGEX_OPTIONS).map(opt => ({
    name: opt.Name, value: opt.Value, checked: false
  }));

  result: any = {};

  constructor(private http: HttpClient,
    private meta: Meta,
    private route: ActivatedRoute,
    private location: Location,
    private encoder: EncodeUriHelper,
    private gtag: GtagHelper) {
  }

  ngOnInit() {
    this.warmUpApiServer();

    this.routeSubscribe = this.route.params.subscribe(params => {
      const optionsValue = +params['options'];

      this.pattern = this.encoder.decodeBase64(params['pattern'] || '');
      this.text = this.encoder.decodeBase64(params['text'] || '');
      this.options.forEach(opt => {
        opt.checked = (optionsValue & opt.value) === opt.value;
      });

      this.submit();
    });
  }

  ngOnDestroy() {
    this.routeSubscribe.unsubscribe();
  }

  warmUpApiServer() {
    this.http.get<any>(CONFIG.API.DOTNET.INFO)
      .subscribe({
        next: data => this.engine = data.framework,
        error: () => this.engine = 'offline'
      });
  }

  /** debounce user input */
  delaySubmit(time?: number) {
    if (this.debounceTimer !== null) {
      clearTimeout(this.debounceTimer);
    }
    this.debounceTimer = setTimeout(() => {
        this.submit();
    }, time || CONFIG.DELAY_TIME);
  }

  submit() {
    if (!this.pattern || !this.text) {
      return;
    }

    this.busy = true;
    this.result = {};
    this.expandMatchReult = {};
    this.highlightText = '';

    const pattern = this.encoder.encodeBase64(this.pattern || ''),
      text = this.encoder.encodeBase64(this.text || ''),
      options = this.options.reduce((sum, option) => sum + (option.checked ? option.value : 0), 0),
      url = '/{pattern}/{text}/{options}'.replace('{pattern}', pattern).replace('{text}', text).replace('{options}', options.toString());

    this.updateUrl(url, this.pattern, this.text, options);

    this.http.post<RegExTesterResult>(CONFIG.API.DOTNET.REGEX, {
      pattern: this.pattern,
      text: this.text,
      replace: this.tabReplace?.nativeElement?.classList?.contains('active') ? this.replace : null,
      options: options
    }).subscribe({
      next: data => {
        this.result = data;
        let highlightText = this.text;
        for (let index = data.matches.length - 1; index >= 0; index--) {
          let match = data.matches[index];
          highlightText = highlightText.substring(0, match.index) + `<span class="result-value-small match-${index % CONFIG.MATCH_COLORS_COUNT}">${match.value}</span>` + highlightText.substring(match.index + match.length);
        }
        this.highlightText = highlightText;
        this.busy = false;
      },
      error: () => {
        this.result = { error: 'Error: Cannot contact the API.' };
        this.busy = false;
      }
  });
  }

  updateUrl(url: string, pattern: string, text: string, options: number) {
    this.location.replaceState(url);
    this.gtag.trackPageView(url, pattern, text, options);

    this.meta.updateTag({name: 'og:url', content: url});
    this.meta.updateTag({name: 'og:description', content: 'Pattern: ' + this.pattern});
  }
}
