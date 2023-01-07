import { NxWelcomeComponent } from './nx-welcome.component';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [NxWelcomeComponent, RouterModule],
  selector: 'challenges-root',
  template: ` <router-outlet></router-outlet> `,
  styles: [],
})
export class AppComponent {
}
