import clsx from 'clsx';
import styles from './styles.module.scss';
export default function Container({ children, className, style = {}, classNameContainer, styleContainer = {} }) {
  return (
    <div className={clsx(styles['container'], classNameContainer)} style={{ ...styleContainer }}>
      <div
        className={clsx(className,)}
        style={{ ...style }}
      >
        {children}
      </div>
    </div>
  );
}
