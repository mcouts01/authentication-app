import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { tap } from 'rxjs';
import { DashboardStore } from 'src/app/user/dashboard/dashboard.store';
import { EventService } from 'src/app/event.service';

@Component({
  selector: 'app-event-display',
  templateUrl: './event-display.component.html',
  styleUrls: ['./event-display.component.scss'],
  providers: [DashboardStore],
})
export class EventDisplayComponent implements OnInit {

  events$ = this.dashboardStore.events$;

  constructor(
    private readonly dashboardStore: DashboardStore,
    private readonly eventService: EventService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.eventService.getUpcomingEvents().pipe(
      tap((events) => {
        this.dashboardStore.updateEvents(events);
      })
    ).subscribe();
  }
}
