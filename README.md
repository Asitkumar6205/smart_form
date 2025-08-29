# Mini Survey Form

A simple React + TypeScript + Vite project styled with TailwindCSS.  
The app collects answers from users, validates inputs with **Zod**, and logs them as an object `{ questionId: answer }`.

---

## 📸 Screenshots

### Form Validation Example
![Validation Errors](1.png)

### Survey Submission
![Survey Submission](2.png)
![Survey Submission](3.png)

### Mobile View Responsiveness
![Survey Submission](4.png)

## 🚀 Tech Stack

- [React](https://react.dev/) + [Vite](https://vitejs.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Zod](https://zod.dev/) (form validation)
- ESLint (code linting)

---

## 📦 Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/Asitkumar6205/smart_form.git
cd smart_form
```

### 2. Install dependencies
```bash
npm install
```

### 3. Run the development server
```bash
npm run dev

//The app will be available at:
//👉 http://localhost:8080
```

### 4. Build for production
```bash
npm run build
```

### 5. Preview production build
```bash
npm run preview
```

## 🧪 Example Data Logging

#### On form submission, the app collects answers into an object like this:
```bash
{
  age-group: "18-25",
  company: "Rosa Tech",
  contact-method: "Email",
  email: "sdeasit2@gmail.com",
  frequency: "Weekly",
  full-name: "Asit Kumar",
  interests: ['Technology', 'Sports', 'Travel', 'Music', 'Reading'],
  services: ['Development', 'Consulting']
}
```

## 📂 Project Structure

```bash
project-root/
├── public/ # Static assets (favicon, etc.)
├── src/
│ ├── components/ # Reusable components
│ ├── App.tsx # Main app component
│ ├── main.tsx # Entry point
│ └── index.css # Tailwind styles
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.js
└── package.json
```
