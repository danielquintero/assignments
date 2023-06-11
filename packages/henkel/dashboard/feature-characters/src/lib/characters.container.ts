import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { inject } from '@angular/core';

import { CharactersOverviewComponent } from './characters-overview.component';
import { CharactersActions } from '@challenges/henkle-dashboard-data-access';

@Component({
  selector: 'challenges-characters',
  standalone: true,
  imports: [CommonModule, RouterModule, CharactersOverviewComponent],
  template: ` <router-outlet></router-outlet> `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersContainer implements OnInit {
  private readonly store = inject(Store);

  public getChararterList(): void {
    this.store.dispatch(CharactersActions.loadPageCharacters({}));
  }

  public ngOnInit(): void {
    this.getChararterList();
  }
}
