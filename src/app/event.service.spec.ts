import { EventService } from './event.service';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

describe('EventService', () => {
  let httpSpy: jasmine.SpyObj<HttpClient>;
  let service: EventService;

  beforeEach(() => {
    httpSpy = jasmine.createSpyObj<HttpClient>('httpSpy', ['get', 'post'])
    service = new EventService(httpSpy);
  });

  it('getUpcomingEvents hits upcoming endpoint', (done) => {
    httpSpy.get.and.returnValue(of([]));
    service.getUpcomingEvents().subscribe((events) => {
      expect(events).toEqual([]);
      expect(httpSpy.get).toHaveBeenCalledWith('http://localhost:8080/event/upcoming');
      done();
    });
  });
});
