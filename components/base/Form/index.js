import clsx from 'clsx';
import { useEffect } from 'react';
import { useState } from 'react';
import { useTrans } from '~/context/TransContext';
import { validateUtils } from '~/utils/validate';
import Button from '../Button';
import Input from '../Input';
import styles from './styles.module.scss';
import { filterValidate, mergeInput } from './utils';

export default function Form({
  title = 'Title',
  inputs,
  className,
  style,
  onSubmit = () => {},
  hookForm = {},
  submitText,
}) {
  const { register, handleSubmit, reset, watch, formState } = hookForm;
  const transText = useTrans();
  const [disabledSubmit, setDisabledSubmit] = useState(false);
  const fieldsData = mergeInput(inputs);
  const fieldsNeedValidate = filterValidate(fieldsData);
  const fieldsNeedValidateName = fieldsNeedValidate?.map((item) => {
    return item?.name;
  });
  const watchValidates = watch(fieldsNeedValidateName);
  const initError = {};
  const fieldsDataObject = {};
  fieldsData.forEach((item) => {
    initError[item] = '';
  });
  fieldsData.forEach((item) => {
    fieldsDataObject[item?.name] = item;
  });
  const [error, setError] = useState(initError);

  function setTypeError(name, value) {
    setError((error) => {
      return { ...error, [name]: value };
    });
  }

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      // setTypeError(name, 'Đây là 1 lỗi');
      console.log(type);
      let x = validateUtils(value[name], fieldsDataObject[name]?.validates, transText);
      setTypeError(name, x);
      const allPropsEmpty = Object.values({ ...error, [name]: x }).every((val) => val === '');
      setDisabledSubmit(!allPropsEmpty);
    });
    return () => subscription.unsubscribe();
  }, [watchValidates]);

  function onSubmitFn(data) {
    const allPropsEmpty = Object.values(error).every((val) => val === '');
    if (allPropsEmpty) {
      for (const [key, value] of Object.entries(data)) {
        if (fieldsDataObject[key]?.required && value === '') {
          setTypeError(key, transText['required']);
          return;
        }
      }
      onSubmit(data);
    } else {
      setDisabledSubmit(true);
    }
    // reset();
  }

  const [widthDevice, setWidthDevice] = useState(0);
  useEffect(() => {
    function resize(e) {
      setWidthDevice(window.innerWidth);
    }
    resize ();
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
    };
  }, []);
  return (
    <form onSubmit={handleSubmit(onSubmitFn)} className={clsx(className, styles.form)} style={style}>
      <h3 className={styles['title']}>{title}</h3>
      {inputs?.map((item, index) => {
        return (
          <div
            key={index}
            className={clsx(styles['input'], {
              'flex-wrap': widthDevice <= item?.widthWrap,
            })}
          >
            {item?.list?.map((input, id) => {
              return (
                <Input
                  key={id}
                  label={input?.label}
                  type={input?.type || 'text'}
                  name={input?.name}
                  register={register}
                  {...input?.props}
                  error={error[input?.name]}
                />
              );
            })}
          </div>
        );
      })}
      <Button type="submit" className={styles['submit']} disabled={disabledSubmit}>
        {submitText || 'Submit'}
      </Button>
    </form>
  );
}
