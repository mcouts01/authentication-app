import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { first, Observable, switchMap, tap } from 'rxjs';
import { EventService } from 'src/app/event.service';
import { Event } from 'src/app/user/dashboard/dashboard.store';

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
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    this.events$ = this.eventService.getUpcomingEvents();
    this.selectedEvent$ = this.eventService.eventSelected$;
  }
}
