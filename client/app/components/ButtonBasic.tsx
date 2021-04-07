import * as React from 'react';
import { isEmpty } from 'lodash';
import { useState, useEffect } from 'react';
import '../../assets/styles/components/ButtonBasic.scss';

type InputProps = {
  className?: string;
  id?: string;
  disabled?: boolean;
  name?: string;
  title?: string;
  onClick(): void;
};

export const ButtonBasic: React.FC<InputProps> = ({ id, className, disabled, name, title, onClick }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isLabelVisible, setLabelVisible] = useState<boolean>(false);

  const handleOnChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.persist();
  };

  const handleOnFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setLabelVisible(true);
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (isEmpty(inputValue)) {
      setLabelVisible(false);
    }
  };

  const notifyOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
        type="submit"
      >
        {title}
      </button>
    </div>
  );
};
