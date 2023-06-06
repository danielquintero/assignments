import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'fedex-iam-shell-fedex-iam-feature-shell',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="fedex-iam-container">
      <div>
        <img
          src="https://logos-marcas.com/wp-content/uploads/2020/04/FedEx-Logo.png"
          alt="Fedex"
        />
      </div>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      .fedex-iam-container {
        @apply min-h-screen;
        @apply bg-gray-50;
        @apply flex;
        @apply flex-col;
        @apply justify-center;
        @apply py-12;
        @apply sm:px-6;
        @apply lg:px-8;
      }

      .fedex-iam-container > div {
        @apply sm:mx-auto;
        @apply sm:w-full;
        @apply sm:max-w-md;
      }

      img {
        @apply mx-auto;
        @apply h-16;
        @apply w-auto;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FedexIamFeatureShellComponent {}
