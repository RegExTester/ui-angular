import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegexComponent } from './regex.component';

const regexRoutes: Routes = [
  {path: ':pattern', component: RegexComponent},
  {path: ':pattern/:text', component: RegexComponent},
  {path: ':pattern/:text/:options', component: RegexComponent},
  {path: ':pattern/:text/:options/:engine', component: RegexComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      regexRoutes, {
        // enableTracing: true // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class RegexRoutingModule {}
