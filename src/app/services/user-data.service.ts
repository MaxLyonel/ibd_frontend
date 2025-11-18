import { Inject, Injectable } from "@angular/core";
import { AppStore } from "../store/app.store";
import { Router } from "@angular/router";
import { APP_CONSTANTS } from "../constants/constants";
import { TeacherService } from "./apis/teacher.service";
import { switchMap, tap } from "rxjs";
import { InstutionService } from "./apis/institution.service";



@Injectable({ providedIn: 'root'})
export class UserDataService {
  constructor(
    private appStore: AppStore,
    private router: Router,
    private teacherService: TeacherService,
    private institutionService: InstutionService
  ){}

  loadUserSpecificData(user: any) {
    if(!user && !user.id && !user.selectedRole && !user.selectedRole.role) {
      return;
    }

    const roleId = user.selectedRole.role.id
    switch(roleId) {
      case APP_CONSTANTS.ROLES.DIRECTOR_ROLE:
        this.teacherService.getInfoTeacher(user.person.id).pipe(
          tap((teacherInfo: any) => this.appStore.setTeacherInfo(teacherInfo.data)),
          switchMap((teacherInfo:any) => {
            const { data } = teacherInfo
            return this.institutionService.getInfoInstitution(data.educationalInstitutionId)
          }),
          tap(instInfo => this.appStore.setInstitutionInfo(instInfo))
        ).subscribe({
          next: () => {
            this.router.navigate(['/ibd/consolidar-bachilleres'])
          },
          error: (err) => {
              console.error('Error cargando datos del usuario:', err);
          }
        });
        break;
      case APP_CONSTANTS.ROLES.DISTRICT_ROLE:
      case APP_CONSTANTS.ROLES.DEPARTMENT_ROLE:
        this.router.navigate(['/alta-demanda/main-inbox'])
        break;
      case APP_CONSTANTS.ROLES.ADMIN_ROLE:
        this.router.navigate(['/admin'])
    }
  }
}