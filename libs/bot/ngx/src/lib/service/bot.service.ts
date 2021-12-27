import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BotService {

  constructor(
    private http: HttpClient
  ) { 
    console.log('Bot Service Launched')
  }

  sayHello(){
    this.http.get('/api/bot').subscribe(x =>{
      console.log(x)
    })
  }
}
