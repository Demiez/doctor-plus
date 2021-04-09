import * as React from 'react';
import '../../assets/styles/components/ButtonBasic.scss';

type ButtonProps = {
  className?: string;
  id?: string;
  disabled?: boolean;
  name?: string;
  title?: string;
  type?: 'button' | 'submit' | 'reset';
  onClick(): void;
};

export const ButtonBasic: React.FC<ButtonProps> = ({ id, className, disabled, name, title, type, onClick }) => {
  const handleOnChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    onClick();
  };

  return (
    <div className={`button-basic ${className}`}>
      <button
        id={id}
        disabled={disabled}
        onClick={handleOnChange}
        // onFocus={handleOnFocus}
        // onBlur={handleOnBlur}
        name={name}
        type={type}
      >
        {title}
      </button>
    </div>
  );
};
