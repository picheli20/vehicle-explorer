import { InjectionToken } from '@angular/core';

// 1️⃣ Create the token
export const ENVIRONMENT_TOKEN = new InjectionToken<Environment>('ENVIRONMENT_TOKEN');

export interface Environment {
  apiUrl: string;
}
