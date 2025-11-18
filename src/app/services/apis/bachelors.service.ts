import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";


@Injectable({ providedIn: 'root'})
export class BachelorsService {
  private http = inject(HttpClient);

  getBachelors(gestionId: number, sie: number) {
    const params = new HttpParams()
      .set('gestionId', gestionId)
      .set('sie', sie)
    return this.http.get<any>('consolidate-bachelors/obtain', { params }).pipe(
      catchError(err => {
        console.error(err)
        return throwError(() => err)
      })
    )
  }

  reportBechelors(
    gestionId: number,
    sie: number,
    gender: string,
    fullNameDirector: string,
    identityCardDirector: string,
    complementDirector: string = ''
  ) {
    const params = new HttpParams()
      .set('gestionId', gestionId.toString())
      .set('sie', sie.toString())
      .set('gender', gender)
      .set('fullNameDirector', fullNameDirector.toString())
      .set('identityCardDirector', identityCardDirector.toString())
      .set('complementDirector', complementDirector.toString())
    return this.http.get('consolidate-bachelors/report', {
      params,
      responseType: 'blob' as 'blob'
    });
  }
}