import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Observable, tap } from 'rxjs';
import { DashboardStore, Event } from '../../event-root/dashboard/dashboard.store';
import { EventService } from '../../event.service';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-display',
  templateUrl: './event-display.component.html',
  styleUrls: ['./event-display.component.scss'],
  providers: [DashboardStore],
})
export class EventDisplayComponent implements OnInit {

  events$!: Observable<Event[]>;
  selectedEvent$!: Observable<Event>;
  form!: FormGroup;

  constructor(
    private readonly eventService: EventService,
    public auth: AuthService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.selectedEvent$ = this.eventService.selectedEvent$;

    this.form = new FormGroup({
      event: new FormControl(null)
    });

    this.selectedEvent$.subscribe((e: Event) => {
      this.form.get('event')?.setValue(e.eventID, { emitEvent: false });
    });

    this.events$ = this.eventService.getUpcomingEvents();

    this.form.get('event')?.valueChanges.pipe(
      tap((e: Event) => {
        this.router.navigate(['/event', e, 'dashboard']);
      })
    ).subscribe();
  }
}
