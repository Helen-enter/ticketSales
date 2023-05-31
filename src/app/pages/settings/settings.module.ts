import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsRoutingModule } from './settings-routing.module';
import {SettingsComponent} from "./settings/settings.component";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { StatisticComponent } from './statistic/statistic.component';
import {TabViewModule} from "primeng/tabview";
import {TableModule} from "primeng/table";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";
import { TourLoaderComponent } from './tour-loader/tour-loader.component';


@NgModule({
  declarations: [
    SettingsComponent,
    StatisticComponent,
    TourLoaderComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule,
    InputTextModule,
    ButtonModule,
    FormsModule,
    TabViewModule,
    TableModule,
    ToastModule,
    ReactiveFormsModule
  ],
  providers: [
    MessageService
  ]
})
export class SettingsModule { }
