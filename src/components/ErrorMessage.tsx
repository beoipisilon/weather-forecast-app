
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="glass-panel p-4 mt-4 animate-fade-in flex items-center">
      <AlertCircle className="text-destructive mr-2 h-5 w-5 flex-shrink-0" />
      <p className="text-destructive text-sm font-medium">{message}</p>
    </div>
  );
};

export default ErrorMessage;
