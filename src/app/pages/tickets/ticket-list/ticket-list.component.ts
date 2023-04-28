import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TicketService} from 'src/app/srevices/tickets/ticket.service';
import {ITour, ITourTypeSelect} from "../../../models/tours";
import {TicketsStorageService} from "../../../srevices/tiсkets-storage/tiсkets-storage.service";
import {Router} from "@angular/router";
import {BlocksStyleDirective} from "../../../directive/blocks-style.directive";
import {Subscription} from 'rxjs/internal/Subscription';
import {debounceTime, fromEvent} from "rxjs";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit, OnDestroy, AfterViewInit {
  tickets: ITour[] = []
  ticketsCopy: ITour[];
  tourUnsubscriber: Subscription;
  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective
  @ViewChild('tourWrap') tourWrap: ElementRef

  @ViewChild('ticketSearch') ticketSearch: ElementRef
  searchTicketSub: Subscription
  ticketSearchValue: string


  constructor(private ticketService: TicketService,
              private router: Router,
              private ticketStorage: TicketsStorageService) {
  }


  ngOnInit(): void {


    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data
        this.ticketsCopy = [...this.tickets];
        this.ticketStorage.setStorage(data)
      }
    )

    this.tourUnsubscriber = this.ticketService.getTicketTypeObservable().subscribe((data: ITourTypeSelect) => {
      console.log('data', data)

      let ticketType: string;
      switch (data.value) {
        case "single":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "single");
          break;
        case "multi":
          this.tickets = this.ticketsCopy.filter((el) => el.type === "multi");
          break;
        case "all":
          this.tickets = [...this.ticketsCopy];
          break;

      }

      if (data.date) {
        const dateWithoutTime = new Date(data.date).toISOString().split('T');
        const dateValue = dateWithoutTime[0]
        console.log('dateValue', dateValue)
        this.tickets = this.ticketsCopy.filter((el) => el.date === dateValue);
      }

      if (this.blockDirective) {
        setTimeout(() => {
          this.blockDirective.updateItems();

          this.blockDirective.initStyle(0);  // сбрасываем индекс на 0 элемент
        });
      }
    });

  }

  ngAfterViewInit() {
    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup', {passive: true})
    this.searchTicketSub = fromEventObserver.pipe(
      debounceTime(200)).subscribe(((ev: any) => {

        if (this.ticketSearchValue) {

          this.tickets = this.ticketsCopy.filter((el) => el.name.includes(
            this.ticketSearchValue[0].toUpperCase() + this.ticketSearchValue.slice(1, this.ticketSearchValue.length)))
          console.log('upper', this.ticketSearchValue)
        } else {
          this.tickets = [...this.ticketsCopy]
        }
      })
    )

  }

  ngOnDestroy() {
    this.tourUnsubscriber.unsubscribe();
    this.searchTicketSub.unsubscribe()
  }

  goToTicketInfoPage(item: ITour) {
    this.router.navigate([`tickets/ticket/${item.id}`])
  }

  directiveRenderComplete(ev: Event) {
    const el: HTMLElement = this.tourWrap.nativeElement

    el.setAttribute('style', 'background-color: #f1fff')

  }

  findTours(ev: Event): void {
    // console.log('ev', ev)
    //
    // const searchValue = (<HTMLInputElement>ev.target).value
    //
    // if (searchValue) {
    //   this.tickets = this.tickets.filter(el => el.name.includes(searchValue))
    //   console.log(searchValue)
    // } else {
    //   this.tickets = [...this.tickets]
    // }

    // const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup', {passive: true})
    // this.searchTicketSub = fromEventObserver.pipe(
    //   debounceTime(200)).subscribe(((ev: any) => {
    //
    //     if (this.ticketSearchValue) {
    //
    //       this.tickets = this.ticketsCopy.filter((el) => el.name.includes(
    //         this.ticketSearchValue[0].toUpperCase() + this.ticketSearchValue.slice(1, this.ticketSearchValue.length)))
    //       console.log('upper', this.ticketSearchValue)
    //     } else {
    //       this.tickets = [...this.ticketsCopy]
    //     }
    //   })
    // )

  }

  getTickets() {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data;
        this.ticketsCopy = [...this.tickets];
        this.ticketStorage.setStorage(data);
      }
    )
  }

}
