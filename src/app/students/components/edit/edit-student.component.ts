import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-edit-student',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './edit-student.component.html',
  styleUrls: ['./edit-student.component.css']
})
export class EditStudentComponent implements OnInit {
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }
  
}
