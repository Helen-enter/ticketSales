import {Component, Input, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
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
  settingsActive: boolean = false

  constructor(private userService: UserService) {

  }

  ngOnInit(): void {
    this.user = this.userService.getUser()
    // console.log('header', this.user)

    this.items = [
      {
        label: 'Билеты',
        routerLink: ['tickets-list']
      },
      {
        label: 'Выйти',
        routerLink: ['/auth']
      },
    ];

    this.timerInterval = window.setInterval(() => {
      this.time = new Date()
    }, 1000)
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      window.clearInterval(this.timerInterval)
    }
  }

  initMenuItems(): MenuItem[] {
    return [
      {
        label: 'Билеты',
        routerLink: ['tickets-list']
      },
      {
        label: 'Настройки',
        routerLink: ['/settings'],
        visible: this.settingsActive
      },
      {
        label: 'Выйти',
        routerLink: ['/auth']
      },

    ];
  }

  ngOnChanges(ev: SimpleChanges): void {
    this.settingsActive = this.menuType?.type === "extended";
    this.items = this.initMenuItems();
  }

}
