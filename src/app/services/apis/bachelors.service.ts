import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, throwError } from "rxjs";


@Injectable({ providedIn: 'root'})
export class BachelorsService {
  private http = inject(HttpClient);

  getBachelorsRegular(gestionId: number, sie: number) {
    const params = new HttpParams()
      .set('gestionId', gestionId)
      .set('sie', sie)
    return this.http.get<any>('consolidate-bachelors/obtain-bachelors-regular', { params }).pipe(
      catchError(err => {
        console.error(err)
        return throwError(() => err)
      })
    )
  }

  getBachelorsAlternative(gestionId: number, sie: number) {
    const params = new HttpParams()
      .set('gestionId', gestionId)
      .set('sie', sie)
    return this.http.get<any>('consolidate-bachelors/obtain-bachelors-alternative', { params }).pipe(
      catchError(err => {
        console.error(err)
        return throwError(() => err)
      })
    )
  }

  getReportGeneralMasculineRegular(gestionId: number, sie: number) {
    const params = new HttpParams()
      .set('gestionId', gestionId.toString())
      .set('sie', sie.toString())
    return this.http.get('consolidate-bachelors/report-masculine-bachelors-regular', {
      params,
      responseType: 'blob',
      observe: 'response'
    })
  }

  getReportGeneralFeminineRegular(gestionId: number, sie: number) {
    const params = new HttpParams()
      .set('gestionId', gestionId.toString())
      .set('sie', sie.toString())
    return this.http.get('consolidate-bachelors/report-femenine-bachelors-regular', {
      params,
      responseType: 'blob',
      observe: 'response'
    })
  }

  getReportGeneralMasculineAlternative(gestionId: number, sie: number) {
    const params = new HttpParams()
      .set('gestionId', gestionId.toString())
      .set('sie', sie.toString())
    return this.http.get('consolidate-bachelors/report-masculine-bachelors-alternative', {
      params,
      responseType: 'blob',
      observe: 'response'
    })
  }

  getReportGeneralFeminineAlternative(gestionId: number, sie: number) {
    const params = new HttpParams()
      .set('gestionId', gestionId.toString())
      .set('sie', sie.toString())
    return this.http.get('consolidate-bachelors/report-femenine-bachelors-alternative', {
      params,
      responseType: 'blob',
      observe: 'response'
    })
  }

  consolidateRegular(gestionId: number, sie: number, userId: number, ibanClose: number) {
    console.log("-->", gestionId, sie, userId, ibanClose)
    const params = new HttpParams()
      .set('gestionId', gestionId.toString())
      .set('sie', sie.toString())
      .set('userId', userId.toString())
      .set('ibanClose', ibanClose.toString());
    console.log("llega aqui: ", gestionId, sie, userId, ibanClose)
    return this.http.get('consolidate-bachelors/consolidate-regular', {
      params,
      responseType: 'blob',
      observe: 'response'
    })
  }

  consolidateAlternative(gestionId: number, sie: number, userId: number, ibanClose: number) {
    const params = new HttpParams()
      .set('gestionId', gestionId.toString())
      .set('sie', sie.toString())
      .set('userId', userId.toString())
      .set('ibanClose', ibanClose.toString())
    return this.http.get('consolidate-bachelors/consolidate-alternative', {
      params,
      responseType: 'blob',
      observe: 'response'
    })
  }
}