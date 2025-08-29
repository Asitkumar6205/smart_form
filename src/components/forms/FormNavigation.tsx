import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface FormNavigationProps {
  currentStep: number;
  totalSteps: number;
  canProceed: boolean;
  isLastStep: boolean;
  onBack: () => void;
  onNext: () => void;
  onSubmit: () => void;
}

export const FormNavigation: React.FC<FormNavigationProps> = ({
  currentStep,
  totalSteps,
  canProceed,
  isLastStep,
  onBack,
  onNext,
  onSubmit
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-6 border-t border-border">
      <div className="flex items-center gap-2">
        {currentStep > 0 && (
          <Button
            variant="outline"
            onClick={onBack}
            className="flex items-center gap-2"
          >
            <ChevronLeft className="h-4 w-4" />
            Back
          </Button>
        )}
      </div>

      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>{currentStep + 1}</span>
        <span>of</span>
        <span>{totalSteps}</span>
      </div>

      <div className="flex items-center gap-2">
        {isLastStep ? (
          <Button
            onClick={onSubmit}
            disabled={!canProceed}
            className="flex items-center gap-2"
          >
            Submit
          </Button>
        ) : (
          <Button
            onClick={onNext}
            disabled={!canProceed}
            className="flex items-center gap-2"
          >
            Continue
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};