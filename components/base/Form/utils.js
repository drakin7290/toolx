export function mergeInput(inputs) {
  return inputs
    ?.map((item) => {
      if (item?.list?.length > 0) {
        return item?.list?.reduce((acc, curr) => {
          return [...acc, curr];
        }, []);
      }
      return [];
    })
    ?.reduce((acc, currentValue) => {
      return acc.concat(currentValue);
    }, []);
}
export function filterValidate(mergeInput) {
  return mergeInput?.reduce((acc, curr) => {
    if (curr?.hasOwnProperty('validates')) {
      return [...acc, curr];
    }
    return [...acc];
  }, []);
}
