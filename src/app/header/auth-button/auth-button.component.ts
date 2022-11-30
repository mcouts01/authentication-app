import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { tap } from 'rxjs';
import { EventService } from 'src/app/event.service';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent implements OnInit {

  events$ = this.eventService.getUpcomingEvents();

  constructor(
    @Inject(DOCUMENT) public document: Document, 
    public auth: AuthService, 
    private readonly router: Router,
    private readonly eventService: EventService
  ) { }

  ngOnInit(): void {
    this.auth.isAuthenticated$.pipe(
      tap(
        (isAuthenticated) => isAuthenticated ? this.router.navigateByUrl('user/dashboard') : this.router.navigateByUrl('/')
      )
    ).subscribe();


  }
}
