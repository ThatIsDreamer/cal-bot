import React from 'react';

import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps, className }) => {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className={cn("progress-bar-container", className)}>
      <div className="progress-bar" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default ProgressBar;
