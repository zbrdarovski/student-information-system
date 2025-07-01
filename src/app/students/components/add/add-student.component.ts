import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { format } from 'date-fns';

@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css']
})
export class AddStudentComponent {
  newStudent: Omit<Student, 'id'> = {
    studentId: '',
    fullName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: 'Does Not Specify',
    enrollmentDate: '',
    courses: []
  };

  availableCourses: string[] = ['Math', 'Physics', 'Chemistry', 'Biology'];

  // Date of birth must be between 18 and 30 years old
  currentYear = new Date().getFullYear();
  maxDob = this.formatDate(new Date(new Date().setFullYear(this.currentYear - 18)));
  minDob = this.formatDate(new Date(new Date().setFullYear(this.currentYear - 30)));

  constructor(private studentService: StudentService, private router: Router) { }

  onCourseToggle(event: Event, course: string) {
    const input = event.target as HTMLInputElement;
    const index = this.newStudent.courses.indexOf(course);

    if (input.checked && index === -1) {
      if (this.newStudent.courses.length < 3) {
        this.newStudent.courses.push(course);
      } else {
        input.checked = false;
        alert('Select exactly 3 courses.');
      }
    } else if (!input.checked && index > -1) {
      this.newStudent.courses.splice(index, 1);
    }
  }

  addStudent() {
    // Do nothing if form is invalid — let template show validation
    if (
      !/^SID-[A-Z0-9]{8}$/.test(this.newStudent.studentId) ||
      !/^[A-Z][a-z]+ [A-Z][a-z]+$/.test(this.newStudent.fullName) ||
      !/^[a-z]+\.[a-z]+@university\.edu$/.test(this.newStudent.email) ||
      this.newStudent.courses.length !== 3
    ) {
      return;
    }
    this.studentService.addStudent(this.newStudent);
    alert('Student added successfully!');
    this.router.navigate(['/overview'], { queryParams: { page: 'last' } });
  }

  private formatDate(date: Date): string {
    return format(date, 'yyyy-MM-dd');
  }

  generateEmailFromName(fullName: string) {
    const [firstName, lastName] = fullName.trim().toLowerCase().split(' ');
    if (firstName && lastName) {
      const sanitizedFirst = firstName.replace(/[^a-z]/g, '');
      const sanitizedLast = lastName.replace(/[^a-z]/g, '');
      this.newStudent.email = `${sanitizedFirst}.${sanitizedLast}@university.edu`;
    } else {
      this.newStudent.email = '';
    }
  }
}
