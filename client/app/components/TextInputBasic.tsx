import * as React from 'react';
import { useState, useEffect } from 'react';

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

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    e.persist();
    notifyOnchange(e);
  };

  const notifyOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
  };

  return (
    <div className="text-input-basic">
      {label ? <label htmlFor={name}>{label}</label> : null}
      <input
        id={id}
        className={className}
        type="text"
        placeholder={pHolder}
        value={inputValue}
        disabled={disabled}
        onChange={handleOnChange}
        name={name}
      />
    </div>
  );
};
