import clsx from 'clsx';
import Link from 'next/link';

import styles from './styles.module.scss';
export default function Button({
  className = '',
  children,
  onClick = function () {},
  style = {},
  to = '',
  disabled,
  outline = false,
  isLoading = false,
  ...props
}) {
  return (
    <button
      className={clsx(className, styles['btn-primary'], {
        [styles['disabled']]: disabled || isLoading,
        [styles['outline']]: outline,
      })}
      onClick={(e) => {
        onClick(e);
      }}
      style={{
        color: outline,
        borderColor: outline,
        ...style,
      }}
      {...props}
    >
      {isLoading ? (
        'Đang tải...'
      ) : (
        <>
          {children}
          {to != '' && (
            <Link href={to}>
              <a className={styles['link-href']}></a>
            </Link>
          )}
        </>
      )}
    </button>
  );
}
