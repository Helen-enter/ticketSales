import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {INearestTour, INewTour, ITour, ITourLocation} from "../../../models/tours";
import {ActivatedRoute} from "@angular/router";
import {TicketsStorageService} from "../../../srevices/tiсkets-storage/tiсkets-storage.service";
import {IUser} from "../../../models/users";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../../srevices/user/user.service";
import {forkJoin} from 'rxjs/internal/observable/forkJoin';
import {TicketService} from "../../../srevices/tickets/ticket.service";
import {fromEvent, Subscription} from "rxjs";
import {ICustomTicketData} from "../../../models/tickets";
import {IOrder} from 'src/app/models/order';
import {Observable} from 'rxjs';
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-ticket-item',
  templateUrl: './ticket-item.component.html',
  styleUrls: ['./ticket-item.component.scss']
})
export class TicketItemComponent implements OnInit, AfterViewInit, OnDestroy {

  ticket: ITour | undefined
  user: IUser
  userForm: FormGroup

  ticketSearchValue: string
  //nearestTours: ICustomTicketData[]

  nearestTours: ITour[] | any[]
  private tours: Subscription

  toursLocation: ITourLocation[]
  item: ITour

  @ViewChild('ticketSearch') ticketSearch: ElementRef

  searchTicketSub: Subscription
  ticketRestSub: Subscription
  searchTypes = [1, 2, 3]

  dataFilterTours: any = []

  constructor(private route: ActivatedRoute,
              private ticketStorage: TicketsStorageService,
              private userService: UserService,
              private ticketService: TicketService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.user = this.userService.getUser()


    //init formGroup
    this.userForm = new FormGroup({
      firstName: new FormControl('', {validators: Validators.required}),
      lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
      cardNumber: new FormControl(this.user?.cardNumber),
      birthDay: new FormControl(),
      age: new FormControl(),
      citizen: new FormControl(),
    })

    //getNearestTours

    this.getTours()

    this.ticket = this.ticketService.getStorage()
    console.log('this.ticket', this.ticket)

    //params
    // const routeIdParam = this.route.snapshot.paramMap.get('id')
    // const queryIdParam = this.route.snapshot.queryParamMap.get('id')
    //
    // const paramValueId = routeIdParam || queryIdParam
    //
    // if (paramValueId) {
    //  const ticketStorage = this.ticketStorage.getStorage()
    //   this.ticket = ticketStorage.find(el => el.id === paramValueId)
    //   console.log('this ticket:', this.ticket)
    //
    // }

  }

  ngAfterViewInit() {
//after
    this.userForm.controls['cardNumber'].setValue(this.user?.cardNumber)

    const fromEventObserver = fromEvent(this.ticketSearch.nativeElement, 'keyup')
    this.searchTicketSub = fromEventObserver.subscribe((ev: any) => {
      this.initSearchTour()
    })
  }

  ngOnDestroy() {
    this.searchTicketSub.unsubscribe()
  }

  onSubmit(): void {

  }

  selectDate(ev: Event) {

  }


  initSearchTour() {

    if (this.ticketSearchValue) {

      this.http.get('http://localhost:3000/ticket-item/' + this.ticketSearchValue ).subscribe((data) =>{
        //@ts-ignore
        this.nearestTours = data
        console.log('nameTour', data)
      })


      // const type = Math.floor(Math.random() * this.searchTypes.length)
      // //unsubscribe
      // if (this.ticketRestSub && !this.searchTicketSub.closed) {
      //   this.ticketRestSub.unsubscribe()
      // }
      //
      // this.ticketRestSub = this.ticketService.getRandomNearestEvent(type).subscribe((data) => {
      //   //this.nearestTours = this.ticketService.transformData([data], this.toursLocation)
      // })
    } else {
      this.getTours()
    }
  }

  initTour(): void {
    const userData = this.userForm.getRawValue()
    const postData = {...this.ticket, ...userData}

    const userId = this.userService.getUser()?.id || null;

    const postObj: IOrder = {
      age: postData.age,
      birthDay: postData.birthDay,
      cardNumber: postData.cardNumber,
      tourId: postData._id,
      userId: userId
    }

    this.ticketService.sendTourData(postObj).subscribe()

    console.log('postData', postData)
    console.log('this.userForm.getRawValue()', this.userForm.getRawValue())
  }

  getTours() {
    // forkJoin([this.ticketService.getNearestTours(), this.ticketService.getToursLocation()]).subscribe((data) => {
    //
    //   console.log('data', data)
    //
    //   this.toursLocation = data[1]
    //
    //
    //   // this.nearestTours = this.ticketService.transformData(data[0], data[1])
    // })

    this.ticketService.getTours().subscribe((data) => {
      this.nearestTours = data
    })

  }

}


