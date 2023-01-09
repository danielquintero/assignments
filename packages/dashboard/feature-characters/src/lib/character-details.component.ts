import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';

import * as CharactersSelectors from './+state/characters.selectors';

@Component({
  selector: 'challenges-character-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="h-screen overflow-y-scroll overflow-hidden bg-white shadow sm:rounded-lg">
      <div class="flex flex-1">
        <div class="flex items-center">
          <a
            data-test="character-details-go-back"
            class="flex h-full items-center border-t-2 border-transparent pr-6 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            [routerLink]="['/dashboard']"
          >
            <!-- Heroicon name: mini/arrow-long-left -->
            <svg
              class="mr-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M18 10a.75.75 0 01-.75.75H4.66l2.1 1.95a.75.75 0 11-1.02 1.1l-3.5-3.25a.75.75 0 010-1.1l3.5-3.25a.75.75 0 111.02 1.1l-2.1 1.95h12.59A.75.75 0 0118 10z"
                clip-rule="evenodd"
              />
            </svg>
            Back
          </a>
        </div>
        <div class="flex-1 px-4 py-5 sm:px-6">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Character Information
          </h3>
          <p class="mt-1 max-w-2xl text-sm text-gray-500">Personal details.</p>
        </div>
      </div>
      <div class="border-t border-gray-200 px-4 py-5 sm:px-6">
        <dl class="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
          <div class="sm:col-span-1" data-test="character-details-name">
            <dt class="text-sm font-medium text-gray-500">Full name</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ (character$ | async)?.name }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Height</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ (character$ | async)?.properties?.height }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Mass</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ (character$ | async)?.properties?.mass }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Birth Year</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ (character$ | async)?.properties?.birth_year }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Created</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ (character$ | async)?.properties?.created }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Edited</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ (character$ | async)?.properties?.edited }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Gender</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ (character$ | async)?.properties?.gender }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Hair Color</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ (character$ | async)?.properties?.hair_color }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Eye Color</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ (character$ | async)?.properties?.eye_color }}
            </dd>
          </div>
          <div class="sm:col-span-1">
            <dt class="text-sm font-medium text-gray-500">Skin Color</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ (character$ | async)?.properties?.skin_color }}
            </dd>
          </div>

          <div class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500">Description</dt>
            <dd class="mt-1 text-sm text-gray-900">
              {{ (character$ | async)?.description }}
            </dd>
          </div>

          <div class="sm:col-span-2">
            <dt class="text-sm font-medium text-gray-500">Links</dt>
            <dd class="mt-1 text-sm text-gray-900">
              <ul
                role="list"
                class="divide-y divide-gray-200 rounded-md border border-gray-200"
              >
                <li
                  class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                >
                  <div class="flex w-0 flex-1 items-center">
                    <!-- Heroicon name: mini/paper-clip -->
                    <svg
                      class="h-5 w-5 flex-shrink-0 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="ml-2 w-0 flex-1 truncate">{{
                      (character$ | async)?.properties?.url
                    }}</span>
                  </div>
                  <div class="ml-4 flex-shrink-0">
                    <a
                      [href]="(character$ | async)?.properties?.url"
                      target="_blank"
                      class="font-medium text-indigo-600 hover:text-indigo-500"
                      >Visit</a
                    >
                  </div>
                </li>
                <li
                  class="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                >
                  <div class="flex w-0 flex-1 items-center">
                    <!-- Heroicon name: mini/paper-clip -->
                    <svg
                      class="h-5 w-5 flex-shrink-0 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M15.621 4.379a3 3 0 00-4.242 0l-7 7a3 3 0 004.241 4.243h.001l.497-.5a.75.75 0 011.064 1.057l-.498.501-.002.002a4.5 4.5 0 01-6.364-6.364l7-7a4.5 4.5 0 016.368 6.36l-3.455 3.553A2.625 2.625 0 119.52 9.52l3.45-3.451a.75.75 0 111.061 1.06l-3.45 3.451a1.125 1.125 0 001.587 1.595l3.454-3.553a3 3 0 000-4.242z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span class="ml-2 w-0 flex-1 truncate">{{
                      (character$ | async)?.properties?.homeworld
                    }}</span>
                  </div>
                  <div class="ml-4 flex-shrink-0">
                    <a
                      href="{{ (character$ | async)?.properties?.homeworld }}"
                      target="_blank"
                      class="font-medium text-indigo-600 hover:text-indigo-500"
                      >Visit</a
                    >
                  </div>
                </li>
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharacterDetailsComponent {
  private readonly store = inject(Store);
  public readonly character$ = this.store.select(
    CharactersSelectors.selectEntity
  );
}
