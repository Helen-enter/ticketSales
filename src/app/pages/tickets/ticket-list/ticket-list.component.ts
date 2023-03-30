import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TicketService} from 'src/app/srevices/tickets/ticket.service';
import {ITour} from "../../../models/tours";
import {TicketsStorageService} from "../../../srevices/tiсkets-storage/tiсkets-storage.service";
import {Router} from "@angular/router";
import {BlocksStyleDirective} from "../../../directive/blocks-style.directive";
import {Message, MessageService} from "primeng/api";

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.scss']
})
export class TicketListComponent implements OnInit {

  tickets: ITour[]
  @ViewChild('tourWrap', {read: BlocksStyleDirective}) blockDirective: BlocksStyleDirective
  @ViewChild('tourWrap') tourWrap: ElementRef


  constructor(private ticketService: TicketService,
              private router: Router,
              private ticketStorage: TicketsStorageService) {
  }

  ngOnInit(): void {
    this.ticketService.getTickets().subscribe(
      (data) => {
        this.tickets = data
        this.ticketStorage.setStorage(data)
      }
    )
  }

  goToTicketInfoPage(item: ITour) {
    this.router.navigate([`/tickets/ticket/${item.id}`])
  }

}
