import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { catchError, Observable, of, tap } from 'rxjs';
import { Event } from '../../user/event-root/dashboard/dashboard.store';
import { EventService } from '../../event.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { EventStore } from 'src/app/event.store';

@Component({
  selector: 'app-event-display',
  templateUrl: './event-display.component.html',
  styleUrls: ['./event-display.component.scss']
})
export class EventDisplayComponent implements OnInit {

  events$!: Observable<Event[]>;
  selectedEvent$!: Observable<Event | null | undefined>;
  form!: FormGroup;

  constructor(
    private readonly eventService: EventService,
    public auth: AuthService,
    private readonly router: Router,
    private readonly eventStore: EventStore
  ) { }

  ngOnInit(): void {
    this.selectedEvent$ = this.eventStore.selectedEvent$;

    this.form = new FormGroup({
      event: new FormControl(null)
    });

    this.events$ = this.eventService.getUpcomingEvents();

    this.form.get('event')?.valueChanges.subscribe((e: Event) => {
      this.router.navigate(['/user/event', e, 'dashboard']);
    });

    this.selectedEvent$.subscribe(e => {
      this.form.get('event')?.setValue(e?.eventID, { emitEvent: false });
    });
  }
}
