import React, { memo, useEffect, useRef, useState } from 'react';
import Input from '../Input/Input';
import ArrowDownIcon from 'components/icons/ArrowDownIcon';
import styles from'./MultiDropdown.module.scss';

export type Option = {
  key: number;
  value: string;
};

export type MultiDropdownProps = {
  className?: string;
  options: Option[];
  value: Option[];
  onChange: (value: Option[]) => void;
  disabled?: boolean;
  getTitle: (value: Option[]) => string;
  //my add V
  //onChoice: (categoryId: number) => void;
};

const MultiDropdown: React.FC<MultiDropdownProps> = ({ 
  className, options, value, onChange, disabled, getTitle, //onChoice 
}) => {
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const filteredOptions = options.filter((option) =>
    option.value.toLowerCase().includes(inputValue.toLowerCase())
  );
  console.log('value',value)

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

  const handleClick = (item: Option):void => {
    const itemKey = item.key;

    if (value.some((selectedItem) => selectedItem.key === itemKey)) {
      const newValue = value.filter((selectedItem) => selectedItem.key !== itemKey);
      onChange(newValue);
    } else {
      const newValue = [...value, item];
      onChange(newValue);
    }

  //  onChoice(item.key);
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
            const className = value.includes(item) ? styles['options__option--selected'] : styles['options__option'];
            return <div key={item.key} onClick={() => handleClick(item)} className={className}>{item.value}</div>
          })
        }
      </div>
    </>
  )
};

export default memo(MultiDropdown);
