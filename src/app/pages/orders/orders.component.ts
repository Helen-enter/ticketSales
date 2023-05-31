import {Component, OnInit} from '@angular/core';
import {IOrder} from "../../models/order";
import {Subscription} from 'rxjs';
import {TicketService} from "../../srevices/tickets/ticket.service";
import {UserService} from "../../srevices/user/user.service";
import {ITour, ITourClient} from "../../models/tours";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  private orders: Subscription
  user: IOrder | undefined

  ordersIdArr: string [] = [];
  ticket: ITour
  tickets: ITour[] = []


  constructor(private ticketService: TicketService,
              private userService: UserService) {
  }

  ngOnInit(): void {
    const userId = this.userService.getUser().id
    console.log('userId', userId)
    this.orders = this.ticketService.getOrders().subscribe((data: IOrder[]) => {
      this.user = data.find(el => el.userId === userId)

      console.log('this.user?.userId', this.user?.userId)

      data.forEach((el) => {
        console.log("IOrder", el)
        if (el.userId === userId) {
          if (typeof el.tourId == "string") {
            this.ordersIdArr.push(el.tourId);
          }
        }
        console.log('this.orders.id', this.ordersIdArr)


      })
      console.log('this.user?.userId', this.user?.userId)
      if (userId === this.user?.userId) {
        for (let i = 0; i < this.ordersIdArr.length; i++) {
          this.ticketService.getTicketById(this.ordersIdArr[i]).subscribe((data: ITourClient) => {
            console.log('tickets.data', data)
            // @ts-ignore
            this.tickets.push(data);
          })
        }
        console.log('this.ticket', this.tickets)
      } else {
        console.log('Заказов не найдено')
      }
    })


  }

}
