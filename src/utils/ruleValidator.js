import _forEach from 'lodash/forEach';
import _isObject from 'lodash/isObject';
import _get from 'lodash/get';
import _isNil from 'lodash/isNil';

import { EMPTY_OBJECT } from 'constants/app.constants';

const validateRule = (rule, inputValue, formValues, fieldId, options) => {
  const promiseOrObj = rule(fieldId, _get(inputValue, fieldId), formValues, options);
  if (_isObject(promiseOrObj)) return Promise.resolve(promiseOrObj);
  return promiseOrObj;
};

const validateInRecursion = (rules, inputValue, formValues, fieldId, lastExecRulePromise, index, { resolve, reject }, options = EMPTY_OBJECT) => {
  if (index === rules.length) lastExecRulePromise.catch(err => reject({ fieldId: err }));
  lastExecRulePromise
    .then(({ isValid, message, pathToUpdate }) => {
      if (!isValid || index === rules.length) {
        if (_isNil(pathToUpdate) || options.shouldValidatedOnValues) {
          resolve({ [fieldId]: message });
          return;
        }
        resolve({ [fieldId]: { message, pathToUpdate } });
        return;
      }
      const currentPromise = validateRule(rules[index], inputValue, formValues, fieldId, options);
      validateInRecursion(rules, inputValue, formValues, fieldId, currentPromise, index + 1, { resolve, reject }, options);
    });
};

const validateFieldRules = (rules, inputValue, formValues, fieldId, options) => new Promise((resolve, reject) => {
  validateInRecursion(rules, inputValue, formValues, fieldId, Promise.resolve({ isValid: true }), 0, { resolve, reject }, options);
});


const validateOnValues = (inputValue, formValues, ruleSet, options) => {
  const errors = {};
  _forEach(inputValue, (value, fieldId) => {
    if (!ruleSet[fieldId]) return;
    errors[fieldId] = validateFieldRules(ruleSet[fieldId], inputValue, formValues, fieldId, options);
  });
  return errors;
};

const validateWithRules = (inputValue, formValues, ruleSet, options) => {
  const errors = {};
  _forEach(ruleSet, (rules, fieldId) => {
    if (!rules) return;
    errors[fieldId] = validateFieldRules(ruleSet[fieldId], inputValue, formValues, fieldId, options);
  });
  return errors;
};

export const validate = (inputValue, formValues, ruleSet, options = EMPTY_OBJECT) => {
  const funcToExec = options.shouldValidatedOnValues ? validateOnValues : validateWithRules;
  return funcToExec(inputValue, formValues, ruleSet, options);
};
