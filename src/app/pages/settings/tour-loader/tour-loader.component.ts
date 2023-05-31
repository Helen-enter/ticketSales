import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TicketService} from "../../../srevices/tickets/ticket.service";
import {HttpClient} from "@angular/common/http";
import {ITourClient} from "../../../models/tours";


@Component({
  selector: 'app-tour-loader',
  templateUrl: './tour-loader.component.html',
  styleUrls: ['./tour-loader.component.scss']
})
export class TourLoaderComponent implements OnInit {
  tourForm: FormGroup

  constructor(private ticketService: TicketService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.tourForm = new FormGroup<any>({
      name: new FormControl('', {validators: Validators.required}),
      description: new FormControl('', [Validators.required, Validators.minLength(12)]),
      operator: new FormControl(),
      price: new FormControl(),
      img: new FormControl(),
    })
  }

  createTour(): void {
    const tourDataRow = this.tourForm.getRawValue()
    let formParams = new FormData()
    console.log('form params', tourDataRow)
    if (typeof tourDataRow === 'object') {
      for (let prop in tourDataRow) {
        formParams.append(prop, tourDataRow[prop])
      }
    }
    // @ts-ignore
    this.ticketService.createTour(formParams).subscribe((data) => {
      console.log('data tour item', data)
    })
    // this.ticketService.createTour(tourDataRow)
    //   .subscribe((data) => {
    //     console.log('data tour item', data)
    //   })
  }

  selectFile(ev: any): void {
    if (ev.target.files.length > 0) {
      const file = ev.target.files[0]
      console.log('file', file)
      this.tourForm.patchValue({
        img: file
      })

    }
  }

}
