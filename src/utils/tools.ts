import * as https from 'https';

export const randomCode = (len = 6) => {
  let code = '';
  for (let i = 0; i < len; i++) {
    const radom = Math.floor(Math.random() * 10);
    code += radom;
  }
  return code;
};

export const getNotEmptyKey = (arg) => {
  let result = null;
  Object.keys(arg).forEach((key) => {
    arg[key] && (result = key);
  });
  return result;
};
