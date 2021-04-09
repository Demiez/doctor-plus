import * as React from 'react';
import errorIcon from '../../assets/images/error_icon.png';
import '../../assets/styles/components/ErrorBoxBasic.scss';

type ErrorBoxProps = {
  className?: string;
  isVisible: boolean;
  errorText?: string;
};

export const ErrorBoxBasic: React.FC<ErrorBoxProps> = ({ className, errorText, isVisible }) => {
  return (
    <div className={`error-box-basic ${className}`}>
      <img src={errorIcon} alt="Error Icon" className={isVisible ? '' : 'is-hidden'} />
      <span className={isVisible ? '' : 'is-hidden'}>{errorText}</span>
    </div>
  );
};
