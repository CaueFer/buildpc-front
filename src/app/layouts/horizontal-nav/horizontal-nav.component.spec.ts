import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HorizontalNavComponent } from './horizontal-nav.component';

describe('HorizontalNavComponent', () => {
  let component: HorizontalNavComponent;
  let fixture: ComponentFixture<HorizontalNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HorizontalNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HorizontalNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
