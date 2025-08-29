import { z } from 'zod';

// Zod schema for name validation
export const nameSchema = z
  .string()
  .min(1, 'Name is required')
  .refine(
    (value) => !/^\d+$/.test(value.trim()),
    'Name cannot contain only numbers'
  );

// Zod schema for email validation
export const emailSchema = z
  .string()
  .min(1, 'Email is required')
  .email('Please enter a valid email address');

// Question-specific validation schemas
export const questionValidationSchemas = {
  'full-name': nameSchema,
  'email': emailSchema,
} as const;

// Type for question IDs that have specific validation
export type ValidatedQuestionId = keyof typeof questionValidationSchemas;

// Helper function to validate a specific question
export function validateQuestion(questionId: string, value: unknown): string | null {
  if (questionId in questionValidationSchemas) {
    const schema = questionValidationSchemas[questionId as ValidatedQuestionId];
    const result = schema.safeParse(value);
    return result.success ? null : result.error.errors[0]?.message || 'Invalid input';
  }
  return null;
}

// Helper function to check if a question has specific validation
export function hasSpecificValidation(questionId: string): questionId is ValidatedQuestionId {
  return questionId in questionValidationSchemas;
}