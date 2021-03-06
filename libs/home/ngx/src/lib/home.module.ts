import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { BotModule } from '@trader/bot/ngx';
import { MatCardModule } from '@angular/material/card';
import { ChartsModule } from '@new-trader/charts/ngx';
@NgModule({
  imports: [CommonModule, MatCardModule, BotModule, ChartsModule],
  declarations: [HomeComponent],
  exports: [HomeComponent],
})
export class HomeModule {}
