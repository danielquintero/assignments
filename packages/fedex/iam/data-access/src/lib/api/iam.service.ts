import { Injectable, inject } from '@angular/core';
import { UserProfile, UserSignIn, UserSignUp } from '../+state/iam.models';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class IdentityAccessManagementService {
  private readonly endpointURL: string = 'https://demo-api.now.sh/users';
  private readonly http: HttpClient = inject(HttpClient);

  signup(body: UserSignUp): Observable<void> {
    return this.http.post<void>(this.endpointURL, body, {});
  }

  signin(body: UserSignIn): Observable<{ user: UserProfile }> {
    return this.http.post<{ user: UserProfile }>('/api/signin', body, {});
  }
}
