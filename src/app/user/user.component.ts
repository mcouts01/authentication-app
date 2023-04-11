import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { switchMap, tap } from 'rxjs';
import { EventService } from '../event.service';
import { EventStore } from '../event.store';
import { Event } from './event-root/dashboard/dashboard.store';
import { UserStore } from './user.store';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  providers: [ UserStore ] 
})
export class UserComponent implements OnInit {

  constructor(
    private readonly userStore: UserStore,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.userStore.getUserProfile(this.authService.user$);
  }

}
