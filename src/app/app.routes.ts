import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { UpdateemployeeComponent } from './updateemployee/updateemployee.component';
import { ViewemployeeComponent } from './viewemployee/viewemployee.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';
import { LoginGuard } from './login/login.guard';

export const routes: Routes = [
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
    },
    {
        path: 'employee',
        component: EmployeelistComponent,
        canActivate: [
            LoginGuard
        ]
    },
    {
        path: 'employee/view/:id',
        component: ViewemployeeComponent,
        canActivate: [
            LoginGuard
        ]
    },
    {
        path: 'employee/add',
        component: AddemployeeComponent,
        canActivate: [
            LoginGuard
        ]
    },
    {
        path: 'employee/update/:id',
        component: UpdateemployeeComponent,
        canActivate: [
            LoginGuard
        ]
    },
    {
        path: '**',
        redirectTo: 'employee',
        pathMatch: 'full'
    }
];
