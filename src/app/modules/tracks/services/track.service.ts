import { HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { Observable, of } from 'rxjs';
import { map, mergeMap, tap} from 'rxjs/operators';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TrackService {

  //dataTracksTrending$:Observable<TrackModel[]> = of([]);
  //dataTracksRandom$:Observable<any> = of([]);

  private readonly URL = environment.api;

  constructor(private httpClient:HttpClient) { 
    
  }

  private skipById(listTracks:TrackModel[], id:number):Promise<TrackModel[]>{
    return new Promise((resolve, reject)=>{
      const listTemp = listTracks.filter(a => a._id !== id)
      resolve(listTemp)
    })
  }


  getAllTracks$():Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`).
      pipe(
        map(({data} : any) => {
            return data
        })
      )
  }

  getAllRandoms$():Observable<any>{
    return this.httpClient.get(`${this.URL}/tracks`).
      pipe(
        //tap(data => console.log('ok ok ok- antes de',data)),
        mergeMap(({data} : any) => this.skipById(data, 2)),
        //tap(data => console.log('ok ok ok',data))
        //map(({data} : any) => {return data.reverse()})
        //,map((dataRecibida)=>{return dataRecibida.filter((track:TrackModel)=>track._id !== 1)})
      )
  }

}
