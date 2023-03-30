import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketitemComponent } from './ticket-item.component';

describe('TicketitemComponent', () => {
  let component: TicketitemComponent;
  let fixture: ComponentFixture<TicketitemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketitemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TicketitemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
