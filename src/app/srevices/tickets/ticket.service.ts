import {Injectable} from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import {map, Observable, Subject, Subscriber, Subscription} from "rxjs";
import {INearestTour, INewTour, ITour, ITourClient, ITourLocation, ITourTypeSelect} from "../../models/tours";
import {ICustomTicketData} from "../../models/tickets";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketSubject = new Subject<ITourTypeSelect>()
  // 1 вариант доступа к Observable
  // readonly ticketType$ = this.ticketSubject.asObservable();

  private ticketUpdateSubject = new Subject<ITour[]>();
  readonly ticketUpdateSubject$ = this.ticketUpdateSubject.asObservable();

  private ticket: ITour
  private value: boolean

  constructor(private ticketServiceRest: TicketRestService) {
  }

  // postTourItem(): Observable<ITourClient> {
  //   return this.ticketServiceRest.postTourItem()
  // }

  getTickets(): Observable<ITourClient[]> {
    return this.ticketServiceRest.getTickets()
    //   .pipe(map(
    //   (value) => {
    //     const singleTour = value.filter(el => el.type === 'single')
    //     return value.concat(singleTour)
    //   }
    // ))
  }

  getTours(): Observable<ITour[]> {
    return this.ticketServiceRest.getTours()
  }

  // 2 вариант доступа к Observable

  getTicketTypeObservable(): Observable<ITourTypeSelect> {
    return this.ticketSubject.asObservable();
  }

  updateTour(type: ITourTypeSelect): void {
    this.ticketSubject.next(type);
  }

  getError() {
    return this.ticketServiceRest.getRestError()
  }

  getNearestTours(): Observable<INearestTour[]> {
    return this.ticketServiceRest.getNearestTickets()
  }

  getToursLocation(): Observable<ITourLocation[]> {
    return this.ticketServiceRest.getLocationList()
  }

  getRandomNearestEvent(type: number): Observable<INearestTour> {
    return this.ticketServiceRest.getRandomNearestEvent(type)
  }

  sendTourData(data: any): Observable<any> {
    return this.ticketServiceRest.sendTourData(data)
  }

  // transformData(data: INearestTour[], regions: ITourLocation[]): ICustomTicketData[] {
  //   const newTicketData: ICustomTicketData[] = [];
  //   data.forEach((el) => {
  //     const newEl = <ICustomTicketData>{...el};
  //     newEl.region = <ICustomTicketData>regions.find((region) => el.locationId === region.id) || {};
  //     newTicketData.push(newEl);
  //   });
  //   return newTicketData;
  // }


  transformData(data: INearestTour[], regions: ITourLocation[]): INewTour[] {
    const newTicketData: INewTour[] = [];
    let newEl: INewTour
    data.map((el) => {

      const nameCountry = regions.find((region) => el.locationId === region.id)
      if (nameCountry) {
        newEl = {...el, nameCountry: nameCountry.name};
      }

      newTicketData.push(newEl);
    });
    console.log('ntd', newTicketData)
    return newTicketData;
  }

  updateTicketList(data: ITour[]) {
    this.ticketUpdateSubject.next(data);
  }

  getTicketById(id: string): Observable<ITourClient> {
    return this.ticketServiceRest.getTicketsById(id)
  }

  setStorage(item: ITour): void {
    this.ticket = item
    // запись данных в this.ticketStorage
  }

  getStorage(): ITour {
    return this.ticket
    // возвращает в this.ticketStorage
  }

  createTour(body: ITourClient): Observable<any> {
    return this.ticketServiceRest.createTour(body)
  }

  getOrders() {
    return this.ticketServiceRest.getOrders()
  }
}


