# Student Information System

A modern, responsive web application for managing student information built with [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15 and PrimeNG version 19.1.3. This system allows administrators to add, edit, delete, and view student records with an intuitive user interface.

## Features

### Implemented
- **Student Management**: Add, edit, and delete student records
- **Student Overview**: Paginated table view with 20 students per page
- **Lazy Loading**: Optimized performance with route-based code splitting
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Form Validation**: Comprehensive client-side validation with real-time feedback
- **Course Management**: Multi-select course enrollment for students
- **Modern UI**: Clean, professional interface with smooth animations

### In Progress
- **Advanced Search**: Filter and search functionality
- **Data Export**: PDF and CSV export capabilities

## Technology Stack

- **Frontend Framework**: Angular 19.2.0
- **UI Library**: PrimeNG 19.1.3
- **Icons**: PrimeIcons 7.0.0
- **Language**: TypeScript 5.7.2
- **Styling**: CSS3 with responsive design
- **Data Generation**: Faker.js for mock data
- **Date Handling**: date-fns library
- **Build Tool**: Angular CLI 19.2.15

## Project Structure

```
src/
├── app/
│   ├── students/                    # Student module
│   │   ├── components/             # Student components
│   │   │   ├── add/               # Add student component
│   │   │   │   ├── add-student.component.ts
│   │   │   │   ├── add-student.component.html
│   │   │   │   └── add-student.component.css
│   │   │   ├── edit/              # Edit student component
│   │   │   │   ├── edit-student.component.ts
│   │   │   │   ├── edit-student.component.html
│   │   │   │   └── edit-student.component.css
│   │   │   └── list/              # Student list component
│   │   │       ├── student-list.component.ts
│   │   │       ├── student-list.component.html
│   │   │       └── student-list.component.css
│   │   ├── models/                # Data models
│   │   │   └── student.model.ts   # Student interface
│   │   └── services/              # Business logic
│   │       └── student.service.ts # Student data service
│   ├── app.component.ts           # Root component
│   ├── app.component.html         # Root template
│   ├── app.component.css          # Root styles
│   ├── app.config.ts              # App configuration
│   └── app.routes.ts              # Routing configuration
├── styles.css                     # Global styles
├── main.ts                        # Application bootstrap
└── index.html                     # HTML entry point
```

## Getting Started

### Prerequisites

Make sure you have the following installed:

- **Node.js**: Version 18.0 or higher
- **npm**: Version 9.0 or higher (comes with Node.js)
- **Angular CLI**: Version 19.0 or higher (optional, can use npx)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/zbrdarovski/student-information-system.git
   cd student-information-system
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   ng serve
   ```

4. **Open your browser**
   
   Navigate to `http://localhost:4200/`

The application will automatically reload when you make changes to the source files.

## Usage Guide

### Navigation

The application uses lazy loading with the following routes:

- **`/overview`** - Main student list (default route)
- **`/overview/add`** - Add new student form
- **`/overview/edit/:id`** - Edit existing student

### Adding a Student

1. Click the **"Add New Student"** button on the overview page
2. Fill in the required information:
   - **Student ID**: ID string
   - **Full Name**: Legal full name
   - **Email**: Valid email address
   - **Phone Number**: Contact number
   - **Date of Birth**: Using the date picker
   - **Gender**: Select from dropdown
   - **Enrollment Date**: Using the date picker
   - **Courses**: Select exactly 3 courses (multiple selection allowed)
3. Click **"Add Student"** to save

### Editing a Student

1. Click the **⋮** (menu) button next to any student in the list
2. Select **"Edit Courses"**
3. Modify the course selections
4. Save changes

### Deleting a Student

1. Click the **⋮** (menu) button next to any student in the list
2. Select **"Delete"**
3. Confirm the deletion in the popup dialog

## Available Scripts

In the project directory, you can run:

- **`npm start`** - Runs the app in development mode using Angular CLI.

- **`npm run build`** - Builds the project for production to the `dist/` folder.

- **`npm run watch`** - Builds the app in development mode and watches for file changes.

- **`npm test`** - Launches the test runner in the interactive watch mode using Karma.

## Customization

### Styling

The application uses modular CSS with component-specific stylesheets. Global styles are in `src/styles.css`.

### Adding New Features

1. **Components**: Generate new components in the appropriate module

2. **Services**: Add business logic in services

3. **Models**: Define interfaces in the models directory

### Data Source

Currently using mock data generated by Faker.js. To connect to a real backend:

1. Update `StudentService` in `src/app/students/services/student.service.ts`
2. Replace mock data methods with HTTP calls
3. Add proper error handling and loading states

## Architecture

### Lazy Loading

The application implements route-based lazy loading for optimal performance:

```typescript
// app.routes.ts
{
  path: 'overview',
  loadComponent: () => import('./students/components/list/student-list.component')
    .then(m => m.StudentListComponent)
}
```

### Standalone Components

Uses Angular's modern standalone component architecture:

- No NgModules required
- Direct component imports
- Reduced bundle size
- Better tree-shaking

### Reactive Forms

Form handling uses Angular Reactive Forms for:

- Type safety
- Complex validation logic
- Better testing capabilities
- Dynamic form controls

## Requirements Met

This project fulfills the following requirements:

- **Add new student** with basic information and courses
- **Edit student** courses
- **Delete student** functionality
- **Overview page** with student table
- **Pagination** with 10/20/50/100 students per page
- **Lazy loading** for the overview route
- **Latest Angular** (v19.2.0)
- **PrimeNG** component library integration

## Additional Resources

- [Angular Documentation](https://angular.dev/)
- [PrimeNG Documentation](https://primeng.org/)
- [Angular CLI Reference](https://angular.dev/tools/cli)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

## License
This project is not licensed for public use. The code is protected by copyright law.  
Viewing is permitted for evaluation purposes only. Copying, modifying, or distributing the code is strictly prohibited.
