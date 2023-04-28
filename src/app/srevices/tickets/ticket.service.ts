import {Injectable} from '@angular/core';
import {TicketRestService} from "../rest/ticket-rest.service";
import {map, Observable, Subject} from "rxjs";
import {INearestTour, INewTour, ITour, ITourLocation, ITourTypeSelect} from "../../models/tours";
import {ICustomTicketData} from "../../models/tickets";

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private ticketSubject = new Subject<ITourTypeSelect>()
  // 1 вариант доступа к Observable
  // readonly ticketType$ = this.ticketSubject.asObservable();

  constructor(private ticketServiceRest: TicketRestService) {
  }

  getTickets(): Observable<ITour[]> {
    return this.ticketServiceRest.getTickets()
    //   .pipe(map(
    //   (value) => {
    //     const singleTour = value.filter(el => el.type === 'single')
    //     return value.concat(singleTour)
    //   }
    // ))
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
}


