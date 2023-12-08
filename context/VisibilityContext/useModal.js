import { useContext } from 'react';
import { VisibilityContext } from './VisibilityProvider';
const useModal = (key = '') => {
  const visibility = useContext(VisibilityContext);
  let modal = visibility?.modal?.state;
  if (key !== '') {
    let modalNow = modal?.[key];
    function setIsOpen(value) {
      visibility?.modal?.setState((prev) => {
        let newVal = value;
        let newObj = { ...prev, [key]: { ...modalNow, isOpen: newVal } };
        return newObj;
      });
    }

    return { ...modalNow, setIsOpen, isOpen: modalNow?.isOpen };
  }
  return visibility?.modal;
};

export default useModal;
