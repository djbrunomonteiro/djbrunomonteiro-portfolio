import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TechModalComponent } from './tech-modal.component';

describe('TechModalComponent', () => {
  let component: TechModalComponent;
  let fixture: ComponentFixture<TechModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TechModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TechModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
