import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, throwError } from "rxjs";


@Injectable({ providedIn: 'root'})
export class InstutionService {
  private http = inject(HttpClient)


  getInfoInstitution(id: number): Observable<any> {
    return this.http.get<any>(`educational-institution/info/${id}`).pipe(
      catchError(err => {
        return throwError(() => err); // relanza el error
      })
    )
  }
}