import {Component, OnInit} from '@angular/core';
import {ObservableExampleService} from "./srevices/testing/observable-example.service";
import {ConfigService} from "./srevices/config/config.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ticketSales2022';
  prop: string

  constructor(private testing: ObservableExampleService,
              private configService: ConfigService) {
    // testing.initObservable()
  }

  ngOnInit() {
    this.configService.configLoad()
    // const myObservable = this.testing.getObservable()
    // myObservable.subscribe((data: string) => {
    //   console.log('second myObservable data', data)
    // })
    //
    // const mySubject = this.testing.getSubject()
    // mySubject.subscribe((data: string) => {
    //   console.log('first data subject', data)
    // })
    //
    // mySubject.next('subject value')
    //
    // const myBehavior = this.testing.getBehaviorSubject()
    // myBehavior.subscribe((data: string) => {
    //   console.log('first data BehaviorSubject', data)
    // })
    //
    // myBehavior.next('new data from behaviorSubject')
  }

  load() {

  }

}
