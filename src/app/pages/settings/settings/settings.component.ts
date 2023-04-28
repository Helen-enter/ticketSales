import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject, Subscription, take, takeUntil} from 'rxjs';
import {ObservableExampleService} from "../../../srevices/testing/observable-example.service";
import {SettingsService} from "../../../srevices/settings/settings.service";
import {AuthService} from "../../../srevices/auth/auth.service";
import {Router} from "@angular/router";
import {ITour} from "../../../models/tours";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  psw: string
  newPsw: string
  pswRepeat: string

  // private subjectScope: Subject<string>
  // private subjectUnsubscribe: Subscription
  //
  // settingsData: Subscription
  // settingsDataSubject: Subscription
  //  private subjectOnsubscribe: Subscription
  //
  private subjectForUnsubscribe = new Subject()

  constructor(private testingExample: ObservableExampleService,
              private settingsService: SettingsService,
              private authService: AuthService,
              private messageService: MessageService) {
  }


  ngOnInit(): void {
    // this.subjectScope = this.testingExample.getSubject()
    //
    // this.settingsData = this.settingsService.loadUserSettings().subscribe((data) => {
    //   console.log('settings data', data)
    // })

    this.settingsService.loadUserSettings().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
      console.log('settings data', data)
    })

    // this.settingsDataSubject = this.settingsService.getSettingsSubjectObservable().pipe(take(1)).subscribe((data) => {
    //   console.log('settings data from subject', data)
    // })

    this.settingsService.getSettingsSubjectObservable().pipe(takeUntil(this.subjectForUnsubscribe)).subscribe((data) => {
      console.log('settings data from subject', data)
    })

    // const myObservable = this.testingExample.getObservable()
    // myObservable.subscribe((data) => {
    //   console.log('observer data', data)
    // })
    // this.subjectScope.subscribe((data: string) => {
    //   console.log('get 1', data)
    // })
    //
    // this.subjectScope.next('this data')
    //
    // this.subjectUnsubscribe = this.subjectScope.subscribe((data: string) => {
    //   console.log('data', data)
    // })
  }

  ngOnDestroy(): void {
    // this.subjectUnsubscribe.unsubscribe()
    //
    // this.subjectScope.unsubscribe()
    //
    // this.settingsData.unsubscribe()

    this.subjectForUnsubscribe.next(true)
    this.subjectForUnsubscribe.complete()
  }


  changePassword(): void {
    if (this.authService.checkUserPassword(this.psw)) {
      if (this.newPsw === this.pswRepeat) {
        this.authService.changePassword(this.newPsw)
        this.messageService.add({severity: 'success', summary: 'Пароль изменен'});
      }

      if (this.newPsw !== this.pswRepeat) {
        this.messageService.add({severity: 'error', summary: 'Пароли не совпадают'});
      }
    }
    else {
      this.messageService.add({severity: 'error', summary: 'Текущий пароль не найден'});
    }
  }


}
