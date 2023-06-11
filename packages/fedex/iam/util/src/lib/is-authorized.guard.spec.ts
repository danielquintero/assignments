import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, CanActivateFn, Router, Routes } from '@angular/router';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { cold } from 'jasmine-marbles';
import { isAuthorizedGuard } from './is-authorized.guard';
import { FedexIamFeatureSignUpComponent } from '@challenges/fedex-iam-sign-up';
import { Observable } from 'rxjs';

describe('isAuthorizedGuard', () => {
  let store: MockStore;
  let router: Router;
  let route: ActivatedRoute;
  const initialState = {};

  const executeGuard: CanActivateFn = (...guardParameters) =>
    TestBed.runInInjectionContext(() => isAuthorizedGuard(...guardParameters));

  const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'iam/sign-up', component: FedexIamFeatureSignUpComponent },
    { path: '**', redirectTo: 'dashboard', pathMatch: 'full' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule.withRoutes(routes)],
      providers: [provideMockStore({ initialState })],
    });
    store = TestBed.inject(MockStore);
    router = TestBed.inject(Router);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true when the user is authorized', () => {
    // Arrange
    store.setState({
      iam: {
        ids: ['001'],
        entities: {
          '001': {
            id: '001',
            email: 'dan@pie.com',
            firstName: 'dan',
            lastName: 'pie',
          },
        },
        loaded: true,
        isProcessing: false,
        error: null,
        selectedId: '001',
      },
    });
    // Act
    const result = executeGuard(route.snapshot, router.routerState.snapshot);

    // Assert
    expect(result).toBeObservable(cold('a', { a: true }));
  });

  it("should navigate to the '/iam/sign-up' route when the user is not authorized", () => {
    // Arrange
    store.setState({
      iam: {
        ids: [],
        entities: {},
        loaded: true,
        isProcessing: false,
        error: undefined,
        selectedId: undefined,
      },
    });
    const routerNavigateSpyFn = jest.spyOn(router, 'navigate');

    // Act
    const result = executeGuard(
      route.snapshot,
      router.routerState.snapshot
    ) as Observable<boolean>;

    // Assert
    result.subscribe(() => {
      expect(routerNavigateSpyFn).toHaveBeenCalledWith(['/iam/sign-up']);
    });
  });

  it('should return false when the user is not authorized', () => {
    // Arrange
    store.setState({
      iam: {
        ids: [],
        entities: {},
        loaded: true,
        isProcessing: false,
        error: undefined,
        selectedId: undefined,
      },
    });

    // Act
    const result = executeGuard(route.snapshot, router.routerState.snapshot);

    // Assert
    expect(result).toBeObservable(cold('a', { a: false }));
  });
});
