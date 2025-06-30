export interface Student {
  id: number;
  studentId: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: 'Male' | 'Female' | 'Does Not Specify';
  enrollmentDate: string;
  courses: string[];  
}
