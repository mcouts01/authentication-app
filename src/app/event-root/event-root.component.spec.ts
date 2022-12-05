import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventRootComponent } from './event-root.component';

describe('UserComponent', () => {
  let component: EventRootComponent;
  let fixture: ComponentFixture<EventRootComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventRootComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventRootComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
