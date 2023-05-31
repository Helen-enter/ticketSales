import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {IMenuType} from 'src/app/models/menuType';
import {ITour, ITourTypeSelect} from 'src/app/models/tours';
import {TicketService} from "../../../srevices/tickets/ticket.service";
import {MessageService} from "primeng/api";
import {SettingsService} from "../../../srevices/settings/settings.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.scss']
})


export class AsideComponent implements OnInit {
  tourTypes: ITourTypeSelect[] = [
    {label: 'Все', value: 'all'},
    {label: 'Одиночный', value: 'single'},
    {label: 'Групповой', value: 'multi'}
  ]
  menuTypes: IMenuType[];
  selectedMenuType: IMenuType
  @Output() updateMenuType: EventEmitter<IMenuType> = new EventEmitter()

  el: boolean = true

  constructor(private ticketService: TicketService,
              private messageService: MessageService,
              private settingsService: SettingsService,
              private http: HttpClient) {
  }

  ngOnInit(): void {

    this.menuTypes = [
      {type: 'custom', label: 'Обычное'},
      {type: 'extended', label: 'Расширенное'}
    ]
  }

  changeType(ev: { ev: Event, value: IMenuType }): void {
    console.log('ev', ev)
    this.updateMenuType.emit(ev.value);
  }

  changeTourType(ev: { ev: Event, value: ITourTypeSelect }): void {
    this.ticketService.updateTour(ev.value)
  }

  selectDate(ev: string) {
    console.log('ev', ev)
    this.ticketService.updateTour({date: ev})
  }

  initRestError(): void {
    this.ticketService.getError().subscribe({
        next: (data) => {

        },
        error: (err) => {
          this.messageService.add({severity: 'warn', summary: `${JSON.stringify(err)}`})
          console.log('err', err)
        }
      }
    )
  }

  initSettingsData(): void {
    this.settingsService.loadUserSettingsSubject({
      saveToken: false
    })
  }

  initTours(): void {
    // this.http.get<ITour[]>('http://localhost:3000/tours/').subscribe((data) => {
    //   this.ticketService.updateTicketList(data)
    // })
    this.http.post<ITour[]>('http://localhost:3000/tours/', {}).subscribe((data) => {
      this.ticketService.updateTicketList(data)
    })



  }

  deleteTours(): void {
    this.http.delete('http://localhost:3000/tours/remove').subscribe((data) => {
      this.ticketService.updateTicketList([])
    })


  }

}
