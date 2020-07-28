import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FetchService {

  constructor(private http : HttpClient) { }

  public click(lat1,log1){
    return this.http.get("http://localhost:8080/getNerbyLoc?lat1="+lat1+"&log1="+log1);
  }
  public clickCinema(lat1,log1){
    return this.http.get("http://localhost:8080/getCinema?lat1="+lat1+"&log1="+log1);
  }
}

