import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';

import { CharactersEntity } from '@challenges/henkle-dashboard-data-access';
import { CharactersSelector } from '@challenges/henkle-dashboard-data-access';
import { CharactersActions } from '@challenges/henkle-dashboard-data-access';

@Component({
  selector: 'challenges-characters-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="py-5">
      <h1
        class="mt-1 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl h1 flex w-auto mx-auto my-0 justify-center text-center"
      >
        Star Wars Characters
      </h1>
      <ul
        role="list"
        class="space-y-3 mt-6 mb-6"
        data-test="character-overview-list"
      >
        <li
          class="overflow-hidden rounded-md bg-white px-6 py-4 shadow flex w-96 mx-auto my-0"
          *ngFor="let character of characters$ | async; trackBy: trackById"
        >
          <a (click)="loadCharacterDetail(character.uid)">{{
            character.name
          }}</a>
        </li>
      </ul>

      <nav
        class="flex items-center justify-between border-t border-gray-200 px-4 sm:px-0"
      >
        <div class="-mt-px flex w-0 flex-1">
          <a
            (click)="currentPage > 0 && loadPage(currentPage - 1)"
            class="inline-flex items-center border-t-2 border-transparent pt-4 pr-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
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
            Previous
          </a>
        </div>
        <div class="hidden md:-mt-px md:flex">
          <a
            *ngFor="let page of pagesArray; let index = index"
            (click)="loadPage(index + 1)"
            [ngClass]="{
              'text-gray-500 hover:border-gray-300 hover:text-gray-700':
                index !== currentPage - 1,
              'border-indigo-500 text-indigo-600': index === currentPage - 1
            }"
            class="inline-flex items-center border-t-2 border-transparent px-4 pt-4 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
            >{{ page }}</a
          >
        </div>
        <div class="-mt-px flex w-0 flex-1 justify-end">
          <a
            (click)="currentPage < totalPages && loadPage(currentPage + 1)"
            data-test="character-overview-next-page"
            class="inline-flex items-center border-t-2 border-transparent pt-4 pl-1 text-sm font-medium text-gray-500 hover:border-gray-300 hover:text-gray-700"
          >
            Next
            <!-- Heroicon name: mini/arrow-long-right -->
            <svg
              class="ml-3 h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                clip-rule="evenodd"
              />
            </svg>
          </a>
        </div>
      </nav>
    </div>
  `,
  styles: [
    `
      :host {
        overflow-y: scroll;
        display: block;
        height: 100vh;
        a {
          cursor: pointer;
        }
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CharactersOverviewComponent implements OnInit {
  private readonly store = inject(Store);
  public readonly characters$ = this.store.select(
    CharactersSelector.selectAllCharacters
  );
  public readonly charactersMetadata$ = this.store.select(
    CharactersSelector.selectCharactersMetadata
  );
  public pagesArray: Array<number> = [];
  public totalPages!: number;
  public currentPage!: number;

  ngOnInit(): void {
    this.charactersMetadata$.subscribe((metadata) => {
      this.totalPages = metadata.total_pages as number;

      if (metadata.total_pages !== null) {
        this.pagesArray = Array(metadata.total_pages)
          .fill(1)
          .map((_, index) => {
            return index + 1;
          });
      }

      if (!metadata.previous) {
        this.currentPage = 1;
      } else if (!metadata.next) {
        this.currentPage = metadata.total_pages as number;
      } else {
        const urlPrevious = new URL(metadata.previous);
        const urlNext = new URL(metadata.next);
        const searchParamsPrevious = urlPrevious.searchParams;
        const searchParamsNext = urlNext.searchParams;
        this.currentPage = Math.floor(
          (Number(searchParamsNext.get('page')) +
            Number(searchParamsPrevious.get('page'))) /
            2
        );
      }
    });
  }

  trackById(index: number, character: CharactersEntity) {
    return character.uid || character.id;
  }

  loadCharacterDetail(id: string) {
    this.store.dispatch(CharactersActions.loadCharacterDetails({ id }));
  }

  loadPage(pageIndex: number) {
    this.store.dispatch(
      CharactersActions.loadPageCharacters({ page: pageIndex })
    );
  }
}
