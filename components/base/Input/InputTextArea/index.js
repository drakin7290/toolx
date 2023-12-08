import clsx from 'clsx';
import styles from './styles.module.scss';
export default function InputTextArea({ register, className, ...props }) {
  return <textarea className={clsx(styles['text-area'], className)} {...props} {...register(props?.name)}></textarea>;
}
