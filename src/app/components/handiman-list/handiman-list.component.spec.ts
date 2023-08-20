import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandimanListComponent } from './handiman-list.component';

describe('HandimanListComponent', () => {
  let component: HandimanListComponent;
  let fixture: ComponentFixture<HandimanListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HandimanListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HandimanListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
