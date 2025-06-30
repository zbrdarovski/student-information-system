import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { StudentListComponent } from './app/students/components/list/student-list.component';

bootstrapApplication(StudentListComponent, appConfig)
  .catch((err) => console.error(err));
