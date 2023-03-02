import { EventService } from './event.service';
import { Event } from './user/event-root/dashboard/dashboard.store';
import { of } from 'rxjs';
import { EventStore } from './event.store';

describe('EventStore', () => {
  let service: jasmine.SpyObj<EventService>;
  let store: EventStore;

  beforeEach(() => {
    service = jasmine.createSpyObj<EventService>('service', ['getEventByID'])
    store = new EventStore(service);
  });

  it('setEventFromID updates store with API data', (done) => {
    service.getEventByID.and.returnValue(of({
      title: 'Awesome'
    } as Event))
    store.setEventFromID(12);
    store.selectedEvent$.subscribe(event => {
      expect(service.getEventByID).toHaveBeenCalledWith(12);
      expect(event?.title).toEqual('Awesome');
      done();
    });
  });
});
