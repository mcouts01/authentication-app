import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { DashboardStore, Event } from './dashboard.store';
import { EventStore } from 'src/app/event.store';
import { UserProfile, UserStore } from '../../user.store';
import { EventService } from 'src/app/event.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [ DashboardStore ]
})
export class DashboardComponent implements OnInit {

  userProfile$!: Observable<UserProfile>;
  selectedEvent$!: Observable<Event | null | undefined>;

  constructor(
    private readonly userStore: UserStore,
    public auth: AuthService,
    private readonly eventStore: EventStore,
    private readonly eventService: EventService
  ) { }

  ngOnInit(): void {
    this.selectedEvent$ = this.eventStore.selectedEvent$;
    this.userProfile$ = this.userStore.userProfile$;
    this.eventService.getEventByID(14).subscribe();
  }
}
