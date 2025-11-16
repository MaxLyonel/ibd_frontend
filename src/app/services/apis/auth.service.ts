import { inject, Injectable } from "@angular/core";
import { AppStore } from "../../store/app.store";
import { HttpClient, HttpContext } from "@angular/common/http";
import { LocalStorageService } from "../local-storage.service";
import { map, Observable, of, tap } from "rxjs";
import { IS_USER_ACTION } from "../../constants/constants";



@Injectable({ providedIn: 'root'})
export class AuthService {
  private appStore = inject(AppStore);
  private http = inject(HttpClient);
  private localStorageService = inject(LocalStorageService);


  login(credentials: any): Observable<any> {
    return this.http.post<any>('auth/login', credentials, {
      context: new HttpContext().set(IS_USER_ACTION, true)
    }).pipe(
      tap((user: any) => {
        const token = user.access_token;
        this.localStorageService.authTokenStore(token);
        const decodedUser = this.localStorageService.decodeUser(token);
        this.localStorageService.userStore(decodedUser);
        this.appStore.setUser(decodedUser);
      })
    )
  }

  logout(): Observable<void> {
    this.localStorageService.clear()
    this.appStore.clear()
    return of(void 0)
  }

  getCurrentUser(): Observable<any> {
    return this.appStore.state$.pipe(
      map(state => state.user)
    )
  }

  isAuthenticated(): Observable<boolean> {
    return this.getCurrentUser().pipe(
      map(user => user !== null)
    )
  }
}