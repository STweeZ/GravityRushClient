import { async, TestBed } from '@angular/core/testing';

import { GravityRushComponent } from './gravity-rush.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        GravityRushComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(GravityRushComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'GravityRush'`, () => {
    const fixture = TestBed.createComponent(GravityRushComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('GravityRush');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(GravityRushComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.content span').textContent).toContain('GravityRush app is running!');
  });
});
