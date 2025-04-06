import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AddemployeeComponent } from './addemployee/addemployee.component';
import { UpdateemployeeComponent } from './updateemployee/updateemployee.component';
import { ViewemployeeComponent } from './viewemployee/viewemployee.component';
import { EmployeelistComponent } from './employeelist/employeelist.component';

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
        component: EmployeelistComponent
    },
    {
        path: 'employee/view/:id',
        component: ViewemployeeComponent
    },
    {
        path: 'employee/add',
        component: AddemployeeComponent
    },
    {
        path: 'employee/update/:id',
        component: UpdateemployeeComponent
    },
    {
        path: '**',
        redirectTo: 'employee',
        pathMatch: 'full'
    }
];
