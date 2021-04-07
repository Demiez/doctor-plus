import * as React from 'react';
import { isEmpty } from 'lodash';
import { useState, useEffect } from 'react';
import '../../assets/styles/components/TextInputBasic.scss';

type InputProps = {
  className?: string;
  id?: string;
  disabled?: boolean;
  label?: string;
  name?: string;
  pHolder?: string;
  onChange(e: React.ChangeEvent<HTMLInputElement>): void;
};

export const TextInputBasic: React.FC<InputProps> = ({ id, className, pHolder, disabled, label, name, onChange }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [isLabelVisible, setLabelVisible] = useState<boolean>(false);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    e.persist();
    notifyOnchange(e);
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
    onChange(e);
  };

  return (
    <div className={`text-input-basic ${className}`}>
      {isLabelVisible ? <label htmlFor={name}>{label}</label> : null}
      <input
        id={id}
        type="text"
        placeholder={pHolder}
        value={inputValue}
        disabled={disabled}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        name={name}
      />
    </div>
  );
};
