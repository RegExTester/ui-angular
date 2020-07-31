import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegexComponent } from './regex/regex.component';

const appRoutes: Routes = [
  {path: '', component: RegexComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes, {
        // enableTracing: true // <-- debugging purposes only
      }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
