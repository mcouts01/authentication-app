import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';
import { EventService } from '../event.service';
import { Event } from './dashboard/dashboard.store';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ UserService ]
})
export class UserComponent implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private readonly eventService: EventService
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      switchMap(params => this.eventService.getEventByID(params['eventId']).pipe(
        tap((e: Event) => this.userService.setEvent(e))
      ))
    ).subscribe();
  }

}
