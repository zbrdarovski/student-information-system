import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'overview',
    loadComponent: () => import('./students/components/list/student-list.component').then(m => m.StudentListComponent)
  },
  {
    path: 'overview/add',
    loadComponent: () => import('./students/components/add/add-student.component').then(m => m.AddStudentComponent)
  },
  {
    path: 'overview/edit/:id',
    loadComponent: () => import('./students/components/edit/edit-student.component').then(m => m.EditStudentComponent)
  },
  {
    path: '',
    redirectTo: '/overview',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: '/overview'
  }
];
