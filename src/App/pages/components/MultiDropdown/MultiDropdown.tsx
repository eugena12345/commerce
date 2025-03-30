import React, { memo, useEffect, useRef, useState } from 'react';
import Input from '../Input/Input';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import styles from'./MultiDropdown.module.scss';

export type Option = {
  /** Ключ варианта, используется для отправки на бек/использования в коде */
  key: string;
  /** Значение варианта, отображается пользователю */
  value: string;
};

/** Пропсы, которые принимает компонент Dropdown */
export type MultiDropdownProps = {
  className?: string;
  /** Массив возможных вариантов для выбора */
  options: Option[];
  /** Текущие выбранные значения поля, может быть пустым */
  value: Option[];
  /** Callback, вызываемый при выборе варианта */
  onChange: (value: Option[]) => void;
  /** Заблокирован ли дропдаун */
  disabled?: boolean;
  /** Возвращает строку которая будет выводится в инпуте. В случае если опции не выбраны, строка должна отображаться как placeholder. */
  getTitle: (value: Option[]) => string;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ className, options, value, onChange, disabled, getTitle }) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(inputValue.toLowerCase())
  );

  const openOptions = (event: React.MouseEvent<HTMLInputElement>) => {
    if (disabled === true) {
      return;
    }
    event.stopPropagation();
    setIsOptionsOpen(true);
  };
  const closeOptions = () => setIsOptionsOpen(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeOptions();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const args: { placeholder: string, value: string } = {
    placeholder: '',
    value: '',
  };
  if (value.length === 0) {
    args.placeholder = getTitle(value);
  };
  if (inputValue.length > 0) {
    args.value = inputValue;
    args.placeholder = getTitle(value);
  } else if (value.length > 0 && inputValue === '' && isOptionsOpen) {
    args.placeholder = getTitle(value);
  } else if (value.length > 0 && inputValue === '' && !isOptionsOpen) {
    args.value = getTitle(value);
  }

  const handleClick = (item: Option) => {
    const itemKey = item.key;

    if (value.some((selectedItem) => selectedItem.key === itemKey)) {
      const newValue = value.filter((selectedItem) => selectedItem.key !== itemKey);
      onChange(newValue);
    } else {
      const newValue = [...value, item];
      onChange(newValue);
    }
  }

  const handleUpdateInputValue = (stringValue: string): void => {
    setInputValue(stringValue);
  }
  return (
    <>
      <Input className={className} onChange={handleUpdateInputValue} afterSlot={<ArrowDownIcon />} disabled={disabled} onClick={openOptions} {...args}
      />
      <div ref={dropdownRef} className={styles.options}>
        {isOptionsOpen && !disabled &&
          filteredOptions.map((item) => {
            const className = value.includes(item) ? styles.selected : styles.options
            return <div key={item.key} onClick={() => handleClick(item)} className={className}>{item.value}</div>
          })
        }
      </div>
    </>
  )
};

export default memo(MultiDropdown);
