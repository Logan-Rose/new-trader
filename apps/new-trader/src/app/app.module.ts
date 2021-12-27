import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HomeModule } from '@trader/home'
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxEchartsModule } from 'ngx-echarts';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HomeModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts'), 
    }),
  
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
