import { TestBed, async, inject } from '@angular/core/testing';

import { AuthInitGuard } from './auth-init.guard';

describe('AuthInitGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthInitGuard]
    });
  });

  it('should ...', inject([AuthInitGuard], (guard: AuthInitGuard) => {
    expect(guard).toBeTruthy();
  }));
});
