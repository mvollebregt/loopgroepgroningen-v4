import {DatePipe} from './date.pipe';

describe('DatePipe', () => {

  const pipe = new DatePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('moet niets tonen bij geen datum', () => {
    expect(pipe.transform(null, 'mini')).toBeFalsy();
  });

  it('moet een datum in mini-formaat tonen', () => {
    expect(pipe.transform('1976-07-13', 'mini')).toBe('di 13');
  });


});
