import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { Observable } from 'rxjs';
import { EventStore } from 'src/app/event.store';
import { Event } from '../user/event-root/dashboard/dashboard.store';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit {

  eventList$: Observable<Event[]> = this.eventStore.eventList$;
  registeredEvents$: Observable<Event[]> = this.eventStore.registeredEvents$;

  constructor(
    private readonly eventStore: EventStore,
    private readonly auth: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    // combineLatest([this.eventStore.eventList$, this.auth.user$]).subscribe(([eventList, user]) => {
    //   this.eventList = eventList;
    //   user?.['https://www.auth-app.com/participant']?.forEach((eventID: string) => {
    //     console.log(eventID);
    //     this.registeredEvents = this.eventList.filter(e => (e.eventID === Number.parseInt(eventID)));
    //     this.eventList = this.eventList.filter(e => !(e.eventID === Number.parseInt(eventID)));
    //   });
    // });
    // this.eventStore.eventList$.subscribe(e => this.eventList = e);
    // this.auth.user$.subscribe((user) => user?.['https://www.auth-app.com/participant']?.forEach((eventID: string) => {
    //   console.log(eventID);
    //   this.eventList = this.eventList.filter(e => e.eventID === Number.parseInt(eventID));
    // }));
  }

  register(event: Event): void {
    this.auth.getAccessTokenSilently({ scope: `participant:${event.eventID}`}).subscribe((response) => {
      console.log(response);
    });
  }

  goToDashboard(event: Event): void {
    this.router.navigateByUrl(`/user/event/${event.eventID}/dashboard`);
  }

}
