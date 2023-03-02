import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EventService } from '../../event.service';

@Component({
  selector: 'app-event-management',
  templateUrl: './event-management.component.html',
  styleUrls: ['./event-management.component.scss']
})
export class EventManagementComponent implements OnInit {

  form!: FormGroup;

  constructor(
    private readonly eventService: EventService
  ) { }

  ngOnInit(): void {
    this.form = new FormGroup({ 
      title: new FormControl('', [Validators.required, Validators.maxLength(254), Validators.pattern('[a-zA-Z]+')]),
      description: new FormControl('', [Validators.required, Validators.maxLength(254), Validators.pattern('[a-zA-Z]+')]),
      start: new FormControl('', [Validators.required]),
      end: new FormControl('', [Validators.required])
    });
  }

  submit() {
    console.log('submitting');
    this.eventService.createEvent(this.form.value);
  }
}
