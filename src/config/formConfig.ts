export type QuestionType = 'text' | 'radio' | 'checkbox';

export interface Question {
  id: string;
  type: QuestionType;
  label: string;
  required: boolean;
  options?: string[]; // For radio and checkbox questions
  placeholder?: string; // For text questions
}

export interface Screen {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
}

export interface Chapter {
  id: string;
  title: string;
  description?: string;
  screens: Screen[];
}

export interface FormConfig {
  title: string;
  description: string;
  chapters: Chapter[];
}

export const formConfig: FormConfig = {
  title: "Mini Survey Form",
  description: "A dynamic multi-step form example",
  chapters: [
    {
      id: "personal-info",
      title: "Personal Information",
      description: "Let's start with some basic information about you",
      screens: [
        {
          id: "basic-details",
          title: "Basic Details",
          description: "Tell us about yourself",
          questions: [
            {
              id: "full-name",
              type: "text",
              label: "Full Name",
              required: true,
              placeholder: "Enter your full name"
            },
            {
              id: "email",
              type: "text",
              label: "Email Address",
              required: true,
              placeholder: "Enter your email address"
            }
          ]
        },
        {
          id: "demographics",
          title: "Demographics",
          description: "Help us understand your background",
          questions: [
            {
              id: "age-group",
              type: "radio",
              label: "Age Group",
              required: true,
              options: ["18-25", "26-35", "36-45", "46-55", "55+"]
            },
            {
              id: "interests",
              type: "checkbox",
              label: "Interests (select all that apply)",
              required: false,
              options: ["Technology", "Sports", "Arts", "Travel", "Music", "Reading"]
            }
          ]
        }
      ]
    },
    {
      id: "preferences",
      title: "Preferences",
      description: "Tell us about your preferences and needs",
      screens: [
        {
          id: "communication",
          title: "Communication Preferences",
          description: "How would you like to hear from us?",
          questions: [
            {
              id: "contact-method",
              type: "radio",
              label: "Preferred Contact Method",
              required: true,
              options: ["Email", "Phone", "SMS", "Mail"]
            },
            {
              id: "frequency",
              type: "radio",
              label: "Contact Frequency",
              required: true,
              options: ["Daily", "Weekly", "Monthly", "Quarterly"]
            }
          ]
        },
        {
          id: "final-details",
          title: "Final Details",
          description: "Just a few more questions to complete your profile",
          questions: [
            {
              id: "company",
              type: "text",
              label: "Company Name",
              required: false,
              placeholder: "Enter your company name (optional)"
            },
            {
              id: "services",
              type: "checkbox",
              label: "Services of Interest",
              required: true,
              options: ["Consulting", "Development", "Design", "Marketing", "Support"]
            }
          ]
        }
      ]
    }
  ]
};