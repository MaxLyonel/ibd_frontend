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
}