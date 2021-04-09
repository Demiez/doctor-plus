import * as React from 'react';
import errorIcon from '../../assets/images/error_icon.png';
import '../../assets/styles/components/ButtonBasic.scss';

type ErrorBoxProps = {
  className?: string;
  isVisible?: boolean;
  errorText?: string;
  // id?: string;
  // disabled?: boolean;
  // name?: string;
  // title?: string;
  // type?: 'button' | 'submit' | 'reset';
  // onClick(): void;
};

export const ErrorBasic: React.FC<ErrorBoxProps> = ({ className, errorText }) => {
  errorText = 'error text about error';
  return (
    <div className={`error-box-basic ${className}`}>
      <img src={errorIcon} alt="Error Icon" />
      <span>{errorText}</span>
    </div>
  );
};
