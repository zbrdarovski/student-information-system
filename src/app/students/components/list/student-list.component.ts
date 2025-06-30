import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  displayedStudents: Student[] = [];

  // Pagination
  currentPage = 1;
  pageSize = 20;
  totalPages = 1;

  // Track which student's action menu is open
  openActionMenuId: number | null = null;

  constructor(private studentService: StudentService) {}

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;
      this.totalPages = Math.ceil(this.students.length / this.pageSize);
      this.setPage(this.currentPage);
    });
  }

  setPage(page: number) {
    if (page < 1 || page > this.totalPages) return;
    this.currentPage = page;
    const start = (page - 1) * this.pageSize;
    this.displayedStudents = this.students.slice(start, start + this.pageSize);
    this.openActionMenuId = null; // close any open menu on page change
  }

  deleteStudent(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id);
      // After deletion, update pagination and displayed list
      this.students = this.students.filter(s => s.id !== id);
      this.totalPages = Math.ceil(this.students.length / this.pageSize);
      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }
      this.setPage(this.currentPage);
    }
  }

  toggleActionMenu(studentId: number) {
    if (this.openActionMenuId === studentId) {
      this.openActionMenuId = null;
    } else {
      this.openActionMenuId = studentId;
    }
  }
}
