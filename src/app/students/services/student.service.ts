import { Injectable } from '@angular/core';
import { Student } from '../models/student.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { faker } from '@faker-js/faker';
import { format } from 'date-fns';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [];
  private students$ = new BehaviorSubject<Student[]>(this.students);
  private idCounter = 1;

  constructor() {
    for (let i = 0; i < 100; i++) {
      const dob = faker.date.birthdate({ min: 18, max: 30, mode: 'age' });
      const dateOfBirth = `${dob.getDate().toString().padStart(2, '0')}/${(dob.getMonth() + 1).toString().padStart(2, '0')}/${dob.getFullYear()}`;

      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();

      const enrollmentDate = format(faker.date.past({ years: 5 }), 'dd/MM/yy');

      this.students.push({
        id: this.idCounter++,
        studentId: 'SID-' + faker.string.alphanumeric(8).toUpperCase(),
        fullName: firstName + ' ' + lastName,
        email: `${firstName.toLowerCase().replace(/[^a-z]/g, '')}.${lastName.toLowerCase().replace(/[^a-z]/g, '')}@university.edu`,
        phoneNumber: faker.phone.number({ style: 'national' }),
        dateOfBirth: dateOfBirth,
        gender: faker.helpers.arrayElement(['Male', 'Female', 'Does Not Specify']),
        enrollmentDate: enrollmentDate,
        courses: (() => {
          const allCourses = ['Math', 'Physics', 'Chemistry', 'Biology'];
          const picked = faker.helpers.arrayElements(allCourses, 3);
          return picked.sort((a, b) => allCourses.indexOf(a) - allCourses.indexOf(b));
        })(),
      });
    }
    this.students$.next(this.students);
  }

  getStudents(): Observable<Student[]> {
    return this.students$.asObservable();
  }

  addStudent(student: Omit<Student, 'id'>): void {
    const newStudent: Student = { id: this.idCounter++, ...student };
    this.students.push(newStudent);
    this.students$.next(this.students);
  }

  updateStudentCourses(id: number, courses: string[]): void {
    const student = this.students.find(s => s.id === id);
    if (student) {
      student.courses = courses;
      this.students$.next(this.students);
    }
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter(s => s.id !== id);
    this.students$.next(this.students);
  }

  getStudentById(id: number): Student | undefined {
    return this.students.find(s => s.id === id);
  }

  updateStudent(id: number, updated: Student): void {
    const index = this.students.findIndex(s => s.id === id);
    if (index > -1) {
      this.students[index] = { ...updated, id };
    }
  }
}
