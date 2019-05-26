import {TestBed} from '@angular/core/testing';

import {AuthPromptService} from './auth-forms.service';

describe('AuthFormsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthPromptService = TestBed.get(AuthPromptService);
    expect(service).toBeTruthy();
  });
});
