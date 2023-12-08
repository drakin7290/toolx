import clsx from 'clsx';
import InputDate from './InputDate';
import InputNumber from './InputNumber';
import InputPassword from './InputPassword';
import InputSearch from './InputSearch';
import InputSelect from './InputSelect';
import InputText from './InputText';
import InputTextArea from './InputTextArea';
import styles from './styles.module.scss';
export default function Input({ register = () => {}, error = '', className = '', ...props }) {
  const { label, type = 'text', value, setValue = () => {}, ...propsInput } = props;
  var TypeInput = null;
  switch (type) {
    case 'date':
      TypeInput = InputDate;
      break;
    case 'password':
      TypeInput = InputPassword;
      break;
    case 'number':
      TypeInput = InputNumber;
      break;
    case 'select':
      TypeInput = InputSelect;
      break;
    case 'textarea':
      TypeInput = InputTextArea;
      break;
    case 'search':
      return <InputSearch className={className} {...props} />;
    default:
      TypeInput = InputText;
  }
  return (
    <div className={styles['form-input']}>
      <label className={styles['label']}>{label}</label>
      <div
        className={clsx(styles['input-div'], {
          [styles['error']]: !!error,
        })}
      >
        <TypeInput {...props} className={clsx(styles['input'], className)} register={register} />
        {/* <input
          type={'text'}
          className={styles['input']}
          value={value}
          {...propsInput}
          onChange={(e) => {
            setValue(e.target.value);
            if (propsInput?.onChange) {
              propsInput.onChange();
            }
          }}
        /> */}
      </div>
      {error && <label className={styles['error']}>{error}</label>}
    </div>
  );
}
