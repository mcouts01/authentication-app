import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { first, Observable, switchMap, tap } from 'rxjs';
import { EventService } from '../../event.service';
import { Event } from '../../event-root/dashboard/dashboard.store';
import { EventStore } from 'src/app/event.store';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent implements OnInit {

  events$!: Observable<Event[]>;
  selectedEvent$!: Observable<Event>;

  constructor(
    @Inject(DOCUMENT) public document: Document, 
    public auth: AuthService, 
    private readonly eventService: EventService,
    private readonly eventStore: EventStore
  ) { }

  ngOnInit(): void {
    this.events$ = this.eventService.getUpcomingEvents();
    this.selectedEvent$ = this.eventStore.selectedEvent$;
  }
}
