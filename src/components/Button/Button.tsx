import React, { memo } from 'react';
import Loader from 'components/Loader';
import styles from './Button.module.scss';
import classNames from 'classnames-ts';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
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

export default memo(Button);
