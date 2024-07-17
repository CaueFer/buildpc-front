import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MontarComponent } from './montar.component';

describe('MontarComponent', () => {
  let component: MontarComponent;
  let fixture: ComponentFixture<MontarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MontarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MontarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
