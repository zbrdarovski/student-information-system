import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { format } from 'date-fns';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
  studentId!: number;
  student!: Student;
  availableCourses: string[] = ['Math', 'Physics', 'Chemistry', 'Biology'];
  currentPage: number | undefined;

  currentYear = new Date().getFullYear();
  maxDob = this.formatDate(new Date(new Date().setFullYear(this.currentYear - 18)));
  minDob = this.formatDate(new Date(new Date().setFullYear(this.currentYear - 30)));

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.currentPage = +params['page'] || 1;
    });
    this.studentId = +this.route.snapshot.paramMap.get('id')!;
    const student = this.studentService.getStudentById(this.studentId);
    if (!student) {
      alert('Student not found.');
      this.router.navigate(['/overview']);
      return;
    }
    this.student = { ...student };
  }

  formatDate(date: Date): string {
    return format(date, 'yyyy-MM-dd');
  }

  onCourseToggle(event: Event, course: string) {
    const input = event.target as HTMLInputElement;
    const index = this.student.courses.indexOf(course);

    if (input.checked && index === -1) {
      if (this.student.courses.length < 3) {
        this.student.courses.push(course);
      } else {
        input.checked = false;
      }
    } else if (!input.checked && index > -1) {
      this.student.courses.splice(index, 1);
    }
  }

  editStudent() {
    if (this.student.courses.length !== 3) {
      return;
    }

    this.studentService.updateStudent(this.studentId, this.student);
    alert('Student updated successfully!');
    this.router.navigate(['/overview'], { queryParams: { page: this.currentPage } });
  }

  generateEmailFromName(fullName: string) {
    const [firstName, lastName] = fullName.trim().toLowerCase().split(' ');
    if (firstName && lastName) {
      const sanitizedFirst = firstName.replace(/[^a-z]/g, '');
      const sanitizedLast = lastName.replace(/[^a-z]/g, '');
      this.student.email = `${sanitizedFirst}.${sanitizedLast}@university.edu`;
    } else {
      this.student.email = '';
    }
  }
}
