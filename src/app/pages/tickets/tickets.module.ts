import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { TicketsComponent } from './tickets.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { TicketListComponent } from './ticket-list/ticket-list.component';
import { AsideComponent } from './aside/aside.component';
import {MenubarModule} from "primeng/menubar";
import {DropdownModule} from "primeng/dropdown";
import {FormsModule} from "@angular/forms";
import {BlocksStyleDirective} from "../../directive/blocks-style.directive";
import {MessageService} from "primeng/api";
import { MessagesModule } from 'primeng/messages';
import {ToastModule} from "primeng/toast";


@NgModule({
  declarations: [
    TicketsComponent,
    HeaderComponent,
    FooterComponent,
    TicketListComponent,
    AsideComponent,
    BlocksStyleDirective
  ],
  exports: [
    TicketsComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    MessagesModule,
    MenubarModule,
    DropdownModule,
    FormsModule,
    ToastModule
  ],
  providers: [
    MessageService
  ]
})
export class TicketsModule { }
