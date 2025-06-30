import { Routes } from '@angular/router';
import { StudentListComponent } from './students/components/list/student-list.component';
import { AddStudentComponent } from './students/components/add/add-student.component';
import { EditStudentComponent } from './students/components/edit/edit-student.component';

export const routes: Routes = [
  { path: '', component: StudentListComponent },
  { path: 'add', component: AddStudentComponent },
  { path: 'edit/:id', component: EditStudentComponent },
  { path: '**', redirectTo: '' }
];
