import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import {SettingsComponent} from "./settings/settings.component";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {FormsModule} from "@angular/forms";
import { StatisticComponent } from './statistic/statistic.component';
import {TabViewModule} from "primeng/tabview";
import {TableModule} from "primeng/table";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";


@NgModule({
  declarations: [
    SettingsComponent,
    StatisticComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    TabViewModule,
    TableModule,
    ToastModule
  ],
  providers: [
    MessageService
  ]
})
export class SettingsModule { }
