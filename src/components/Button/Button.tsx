// import { string } from 'prop-types';
import React from 'react';
import Loader from 'components/Loader';
//'@components/Loader';
//'./../Loader';
import styles from './Button.module.css';
import classNames from 'classnames-ts';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
  'data-testid'?: string;
};

const Button: React.FC<ButtonProps> = (props) => {
  const btnClass = classNames(styles.original, props.className, {
    'loading': props.loading,
    'disabled': props.disabled
  });

  return (
    <button
      onClick={props.onClick}
      onMouseOver={props.onMouseOver}
      data-testid={props['data-testid']}
      disabled={(props.loading || props.disabled)}
      className={btnClass}
      onFocus={props.onFocus}
      onBlur={props.onBlur}
      onMouseOut={props.onMouseOut}
      id={props.id}
      name={props.name}
      style={props.style}
    >
      {props.loading && <Loader size='s' className='white' />}
      {props.children}
    </button>
  )
};

export default Button;
