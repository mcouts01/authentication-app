import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { first, Observable, switchMap, tap } from 'rxjs';
import { DashboardStore, Event } from 'src/app/user/dashboard/dashboard.store';
import { EventService } from 'src/app/event.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-display',
  templateUrl: './event-display.component.html',
  styleUrls: ['./event-display.component.scss'],
  providers: [DashboardStore],
})
export class EventDisplayComponent implements OnInit {

  events$!: Observable<Event[]>;

  form!: FormGroup;

  constructor(
    private readonly eventService: EventService,
    public auth: AuthService,
    private readonly route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      event: new FormControl(null)
    });

    this.events$ = this.eventService.getUpcomingEvents();

    this.route.params.pipe(
      switchMap(params => this.eventService.getEventByID(params['eventID'])),
    ).subscribe(e => {
      this.form.patchValue({ event: e })
    });

    this.form.get('event')?.valueChanges.pipe(
      tap(console.log)
    ).subscribe();
  }
}
