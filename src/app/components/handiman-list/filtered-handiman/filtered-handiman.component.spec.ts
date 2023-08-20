import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilteredHandimanComponent } from './filtered-handiman.component';

describe('FilteredHandimanComponent', () => {
  let component: FilteredHandimanComponent;
  let fixture: ComponentFixture<FilteredHandimanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilteredHandimanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilteredHandimanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
