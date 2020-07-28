import { Component, OnInit,Input } from '@angular/core';
import { FetchService } from './fetch.service';
import {dd} from './dropD';
import { Observable } from 'rxjs';


declare const L: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent{
  users:any;
  dropd:dd;
  resp:any;
  r:any;
  constructor(private service:FetchService) { }
  title = 'Map';
  lat1: any;
  log1: any;

  ngOnInit()
  {
     
    if(!navigator)
    {
      console.log('Location is not supported');
    }
    navigator.geolocation.getCurrentPosition((position) =>{
     // const coords = position.coords;
      this.lat1= position.coords.latitude;
      this.log1 = position.coords.longitude;
     // console.log(`lat: ${this.lat1},log: ${this.log1}`);
      let mymap = L.map('map').setView([this.lat1,this.log1], 13);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidHVzaGFyMjkxMjk4IiwiYSI6ImNrY3R2a3FrYTIyOGQyeHM2bmkwdGR6aWgifQ.xcxo-uxr_FQnl4iz_6QVuw', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
    
    let marker = L.marker([this.lat1,this.log1]).addTo(mymap);
    marker.bindPopup('<b>Nerby Location</b>').openPopup();
    });

  }
  public getData()
  {
    //this.users = null;
   this.service.click(this.lat1,this.log1).subscribe((data)=>{this.resp = data;console.log(this.resp);});
  }
  public getCinema()
  {
   this.service.clickCinema(this.lat1,this.log1).subscribe((data)=>{this.resp = data;console.log(this.resp);});
  }
  
  selectChangeHandler(event : any)
  {
    if(event.target.value == "Hotel")
    {
      this.getData();
    }
    if(event.target.value == "Cinema")
    {
      this.getCinema();
    }
  }
 }
 