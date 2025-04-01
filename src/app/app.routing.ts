import { Routes } from '@angular/router';
import { RegexComponent } from './regex/regex.component';

export const AppRoutes: Routes = [
  {path: '', component: RegexComponent},
  {path: '**', redirectTo: (params) => {
    if (params.url.length >= 4)
      return `${params.url[0]}/${params.url[1]}/${params.url[2]}/${params.url[3]}`;
    else if (params.url.length >= 3)
      return `${params.url[0]}/${params.url[1]}/${params.url[2]}`;
    else if (params.url.length >= 2)
      return `${params.url[0]}/${params.url[1]}`;
    else
      return `${params.url[0]}`;
  }},
  {path: ':pattern', component: RegexComponent},
  {path: ':pattern/:text', component: RegexComponent},
  {path: ':pattern/:text/:options', component: RegexComponent},
  {path: ':pattern/:text/:options/:engine', component: RegexComponent}
];
