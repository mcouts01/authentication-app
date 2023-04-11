import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { EventStore } from './event.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'auth-app';

  constructor(
   public auth: AuthService,
   private readonly eventStore: EventStore
  ) {
    this.eventStore.getEventLists();
  }
}
