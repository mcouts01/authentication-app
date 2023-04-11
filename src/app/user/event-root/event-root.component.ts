import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventStore } from 'src/app/event.store';

@Component({
  selector: 'app-event-root',
  templateUrl: './event-root.component.html',
  styleUrls: ['./event-root.component.scss']
})
export class EventRootComponent implements OnInit {

  constructor(
    private readonly route: ActivatedRoute,
    private readonly eventStore: EventStore
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.eventStore.setEventFromID(params['eventID']);
    });
  }

}
