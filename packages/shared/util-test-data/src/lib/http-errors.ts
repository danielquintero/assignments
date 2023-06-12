import { HttpErrorResponse } from '@angular/common/http';

export const createHttpErrorResponse = (
  status: number,
  statusText: string,
  url: string,
  error: unknown
): HttpErrorResponse =>
  new HttpErrorResponse({ error, status, statusText, url });
