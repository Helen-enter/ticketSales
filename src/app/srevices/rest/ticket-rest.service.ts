import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {INearestTour, ITour, ITourClient, ITourLocation} from "../../models/tours";
import {IOrder} from "../../models/order";

@Injectable({
  providedIn: 'root'
})
export class TicketRestService {

  constructor(private http: HttpClient) {
  }

  getTickets(): Observable<ITourClient[]> {
    //return this.http.get<ITour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/')
    //return this.http.get<ITour[]>('http://localhost:3000/tours')
    return this.http.get<ITourClient[]>('http://localhost:3000/tour-item')
  }

  getTours(): Observable<ITour[]> {
    return this.http.get<ITour[]>('http://localhost:3000/tours')
  }

  getTicketsById(id: string) {
    //return this.http.get<ITour>(`http://localhost:3000/tours/${id}`)
    return this.http.get<ITourClient>(`http://localhost:3000/tour-item/${id}`)
  }

  getRestError(): Observable<any> {
    return this.http.get<any>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/tours/notFound');
  }

  getNearestTickets(): Observable<INearestTour[]> {
    return this.http.get<INearestTour[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/nearestTours/')
  }

  getLocationList(): Observable<ITourLocation[]> {
    return this.http.get<ITourLocation[]>('https://62b9e756ff109cd1dc9dae16.mockapi.io/apiv/v1/location/')
  }

  getRandomNearestEvent(type: number): Observable<INearestTour> {

    switch (type) {
      case 0:
        return this.http.get<INearestTour>('/assets/mocks/nearestTours1.json');
      case 1:
        return this.http.get<INearestTour>('/assets/mocks/nearestTours2.json');
      case 3:
        return this.http.get<INearestTour>('/assets/mocks/nearestTours3.json');
      default:
        return this.http.get<INearestTour>('/assets/mocks/nearestTours2.json');
    }
  }

  sendTourData(data: IOrder): Observable<any> {
    return this.http.post('http://localhost:3000/order/', data)
  }

  createTour(body: ITourClient): Observable<any> {
    return this.http.post('http://localhost:3000/tour-item/', body, {headers: {}})
  }

  getOrders(): Observable<any> {
    return this.http.get('http://localhost:3000/order/')
  }
}
