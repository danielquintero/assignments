import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { selectEntity } from '@challenges/fedex-iam-data-access';

@Component({
  selector: 'fedex-dashboard-fedex-dashboard-feature-shell',
  standalone: true,
  imports: [CommonModule],
  template: ` <p class="text-gray-400 h-1 text-4xl text-center">
    Hi <span> {{ (username$ | async)?.firstName }}</span
    >, welcome to the <span class="text-indigo-600"> FedEx </span> shipping
    platform!
  </p>`,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FedexDashboardFeatureShellComponent {
  private readonly store = inject(Store);
  public readonly username$ = this.store.select(selectEntity);
}
