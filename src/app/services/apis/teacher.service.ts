import { HttpClient, HttpParams } from "@angular/common/http"
import { inject, Injectable } from "@angular/core"
import { catchError, Observable, throwError } from "rxjs"
import { APP_CONSTANTS } from "../../constants/constants"


@Injectable({ providedIn: 'root'})
export class TeacherService {
  private http = inject(HttpClient)

  getInfoTeacher(personId: number): Observable<any> {
    const params = new HttpParams()
      .set('personId', personId)
      .set('gestionId', APP_CONSTANTS.CURRENT_YEAR)

    return this.http.get<any>(`auth/info-teacher`, { params }).pipe(
      catchError(err => {
        console.error("Error al obtener informacion de maestro", err)
        return throwError(() => err)
      })
    )
  }
}