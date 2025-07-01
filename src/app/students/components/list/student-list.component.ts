import { Component, OnInit } from '@angular/core';
import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css']
})
export class StudentListComponent implements OnInit {
  students: Student[] = [];
  displayedStudents: Student[] = [];

  currentPage = 1;
  pageSize = 20;
  totalPages = 1;

  Math = Math;
  openActionMenuId: number | null = null;

  pageSizeOptions = [10, 20, 50, 100];

  constructor(
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.studentService.getStudents().subscribe(data => {
      this.students = data;

      const queryParams = this.route.snapshot.queryParams;
      const sizeParam = +queryParams['pageSize'];
      const pageParam = queryParams['page'];

      if (!isNaN(sizeParam) && this.pageSizeOptions.includes(sizeParam)) {
        this.pageSize = sizeParam;
      }

      this.totalPages = Math.max(1, Math.ceil(this.students.length / this.pageSize));

      if (pageParam === 'last') {
        this.setPage(this.totalPages, false);
      } else if (!isNaN(+pageParam)) {
        const pageNum = +pageParam;
        this.setPage(pageNum, false);
      } else {
        this.setPage(1, false);
      }

      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.currentPage, pageSize: this.pageSize },
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
    });
  }


  private updatePagination() {
    this.totalPages = Math.max(1, Math.ceil(this.students.length / this.pageSize));
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages;
    if (this.currentPage < 1) this.currentPage = 1;
  }

  setPage(page: number, updateUrl = true) {
    if (page < 1) page = 1;
    if (page > this.totalPages) page = this.totalPages;

    this.currentPage = page;

    const start = (page - 1) * this.pageSize;
    this.displayedStudents = this.students.slice(start, start + this.pageSize);
    this.openActionMenuId = null;

    if (updateUrl) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { page: this.currentPage, pageSize: this.pageSize },
        queryParamsHandling: 'merge',
        replaceUrl: true
      });
    }
  }

  onPageSizeChange(event: Event) {
    const newSize = +(event.target as HTMLSelectElement).value;

    if (this.pageSizeOptions.includes(newSize)) {
      this.pageSize = newSize;
      this.currentPage = 1;

      this.updatePagination();
      this.setPage(this.currentPage);
    }
  }

  deleteStudent(id: number) {
    if (confirm('Are you sure you want to delete this student?')) {
      this.studentService.deleteStudent(id);
      this.students = this.students.filter(s => s.id !== id);

      this.updatePagination();

      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
      }

      this.setPage(this.currentPage);
    }
  }

  toggleActionMenu(studentId: number) {
    this.openActionMenuId = this.openActionMenuId === studentId ? null : studentId;
  }
}
