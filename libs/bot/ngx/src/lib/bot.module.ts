import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { BotComponent } from './component/bot.component'
import { BotService } from './service/bot.service';
import { ChartsModule } from '@new-trader/charts/ngx';
@NgModule({
  imports: [
    CommonModule,
    MatSliderModule,
    MatCardModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    ReactiveFormsModule,
    ChartsModule
  ],
  declarations: [
    BotComponent
  ],
  exports: [
    BotComponent
  ],
  providers:[
    BotService
  ]
})
export class BotModule { }