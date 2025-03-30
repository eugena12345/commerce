import React, { memo } from 'react';
import styles from './Input.module.scss';
import classNames from 'classnames-ts';

export type InputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> & {
  /** Значение поля */
  value: string;
  /** Callback, вызываемый при вводе данных в поле */
  onChange: (value: string) => void;
  /** Слот для иконки справа */
  afterSlot?: React.ReactNode;
};

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ value, onChange, afterSlot, ...rest }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.target.value);
    };
    const actualStyles = classNames(styles.customInp, rest.className )
    return (
      <div className={actualStyles}>
        <input type="text" placeholder='Text' value={value} onChange={handleChange} {...rest} />
        {afterSlot && afterSlot}
      </div>

    )
  });

export default memo(Input);
