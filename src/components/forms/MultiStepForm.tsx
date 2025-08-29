import React, { useState, useCallback } from "react";
import { formConfig } from "@/config/formConfig";
import { QuestionRenderer } from "./QuestionRenderer";
import { FormNavigation } from "./FormNavigation";
import { ProgressIndicator } from "./ProgressIndicator";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { ThemeSelector } from "@/components/ThemeSelector";
import { validateQuestion, hasSpecificValidation } from "@/lib/validations";
import { useIsMobile } from "@/hooks/use-mobile";

interface FormAnswers {
  [questionId: string]: string | string[] | undefined;
}

interface ValidationErrors {
  [questionId: string]: string;
}

export const MultiStepForm: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<FormAnswers>({});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const { toast } = useToast();
  const isMobile = useIsMobile();

  // Flatten all screens from all chapters
  const allScreens = formConfig.chapters.flatMap((chapter) =>
    chapter.screens.map((screen) => ({
      ...screen,
      chapterTitle: chapter.title,
    }))
  );

  const currentScreen = allScreens[currentStep];
  const totalSteps = allScreens.length;
  const isLastStep = currentStep === totalSteps - 1;

  const validateCurrentScreen = useCallback(() => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    currentScreen.questions.forEach((question) => {
      const answer = answers[question.id];

      // Check if required field is empty
      if (question.required) {
        if (
          !answer ||
          (typeof answer === "string" && answer.trim() === "") ||
          (Array.isArray(answer) && answer.length === 0)
        ) {
          newErrors[question.id] = "This field is required";
          isValid = false;
          return; // Skip further validation if required field is empty
        }
      }

      // Check specific Zod validations for name and email
      if (hasSpecificValidation(question.id) && answer) {
        const validationError = validateQuestion(question.id, answer);
        if (validationError) {
          newErrors[question.id] = validationError;
          isValid = false;
        }
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [currentScreen, answers]);

  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));

    // Clear error for this question when user starts typing/selecting
    if (errors[questionId]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[questionId];
        return newErrors;
      });
    }
  };

  const handleNext = () => {
    if (validateCurrentScreen()) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    if (validateCurrentScreen()) {
      console.log("Form submitted with answers:", answers);
      toast({
        title: "Form Submitted Successfully!",
        description: "Check the console to see your answers.",
      });
    }
  };

  const canProceed = currentScreen.questions
    .filter((q) => q.required)
    .every((q) => {
      const answer = answers[q.id];
      return (
        answer &&
        (typeof answer !== "string" || answer.trim() !== "") &&
        (!Array.isArray(answer) || answer.length > 0)
      );
    });

  return (
    <div
      className={`min-h-screen bg-background ${
        isMobile
          ? "p-2" // Tighter padding on mobile
          : "p-4 flex items-center justify-center" // Centered on desktop
      }`}
    >
      <div
        className={`w-full ${
          isMobile
            ? "max-w-full" // Full width on mobile
            : "max-w-2xl mx-auto" // Constrained width on desktop
        }`}
      >
        <Card
          className={`border shadow-lg ${
            isMobile
              ? "min-h-[calc(100vh-1rem)]" // Nearly full height on mobile
              : "" // Default height on desktop
          }`}
        >
          <CardHeader
            className={`text-center ${
              isMobile ? "pb-2 px-4 pt-4" : "pb-4" // Reduced padding on mobile
            }`}
          >
            <div
              className={`flex ${
                isMobile
                  ? "flex-col gap-2" // Stack vertically on mobile
                  : "justify-between items-start" // Side by side on desktop
              } mb-4`}
            >
              <div className="flex-1">
                <CardTitle
                  className={`${
                    isMobile ? "text-xl" : "text-2xl"
                  } font-bold flex items-center gap-2`}
                >
                  {formConfig.title}
                </CardTitle>
                <CardDescription className={isMobile ? "text-sm mt-1" : ""}>
                  {`── ${formConfig.description}`}
                </CardDescription>
              </div>
              <div className={isMobile ? "self-end" : ""}>
                <ThemeSelector />
              </div>
            </div>
          </CardHeader>

          <CardContent
            className={`space-y-6 ${
              isMobile
                ? "px-4 pb-4 flex-1" // Tighter padding, flex-grow on mobile
                : "" // Default padding on desktop
            }`}
          >
            <ProgressIndicator
              currentStep={currentStep}
              totalSteps={totalSteps}
              chapterTitle={currentScreen.chapterTitle}
            />

            <div className="space-y-4">
              <div className="text-center space-y-2">
                <h3
                  className={`${
                    isMobile ? "text-lg" : "text-xl"
                  } font-semibold`}
                >
                  {currentScreen.title}
                </h3>
                {currentScreen.description && (
                  <p
                    className={`text-muted-foreground ${
                      isMobile ? "text-sm" : ""
                    }`}
                  >
                    {currentScreen.description}
                  </p>
                )}
              </div>

              <div
                className={`space-y-6 ${
                  isMobile ? "space-y-4" : "" // Tighter spacing between questions on mobile
                }`}
              >
                {currentScreen.questions.map((question) => (
                  <QuestionRenderer
                    key={question.id}
                    question={question}
                    value={answers[question.id]}
                    onChange={(value) => handleAnswerChange(question.id, value)}
                    error={errors[question.id]}
                  />
                ))}
              </div>
            </div>

            <FormNavigation
              currentStep={currentStep}
              totalSteps={totalSteps}
              canProceed={canProceed}
              isLastStep={isLastStep}
              onBack={handleBack}
              onNext={handleNext}
              onSubmit={handleSubmit}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
