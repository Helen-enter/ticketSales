import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {MenuItem} from "primeng/api";
import {IMenuType} from 'src/app/models/menuType';
import {IUser} from "../../../models/users";
import {UserService} from "../../../srevices/user/user.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  items: MenuItem[]
  time: Date
  private timerInterval: number
  user: IUser | null
  @Input() menuType: IMenuType;
  private settingsActive: boolean = false

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {

    this.items = this.initMenuItems()

    // console.log('header', this.user)

    // this.items = [
    //   {
    //     label: 'Билеты',
    //     routerLink: ['/tickets-list']
    //   },
    //   {
    //     label: 'Выйти',
    //     routerLink: ['/auth']
    //   },
    // ];

    this.timerInterval = window.setInterval(() => {
      this.time = new Date()
    }, 1000)

    this.user = this.userService.getUser()
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval)
    }
  }



  ngOnChanges(ev: SimpleChanges): void {
    // if(ev['MenuType']) {
      this.settingsActive = this.menuType?.type === "extended";
      this.items = this.initMenuItems();
    // }
  }

  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Билеты',
        routerLink: ['tickets-list']
      },
      {
        label: 'Настройки',
        routerLink: ['settings'],
        visible: this.settingsActive
      },
      {
        label: 'Заказы',
        routerLink: ['orders']
      },
      {
        label: 'Выйти',
        routerLink: ['/auth']
      },

    ];
  }

}
