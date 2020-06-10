import _flatten from 'lodash/flatten';
import _isUndefined from 'lodash/isUndefined';
import _reduce from 'lodash/reduce';
import _every from 'lodash/every';
import _isObjectLike from 'lodash/isObjectLike';
import _filter from 'lodash/filter';

export const getFieldIds = (unitItem) => {
  if (typeof unitItem === 'string') return [unitItem];
  return _flatten((unitItem.rows || unitItem.columns).map(getFieldIds));
};

export const getFieldIdsFromUnits = units => _flatten(units.map(getFieldIds));

export const getFormErrors = (fieldErrorPromises, prevErrors) => Promise.all(Object.values(fieldErrorPromises))
  .then(errorMessages => _reduce(errorMessages, (acc, data) => ({ ...acc, ...data }), { ...prevErrors }));

export const isErrorEmpty = (errors) => {
  const _isErrorEmpty = errs => _every(errs, (value) => {
    if (_isObjectLike(value)) return _isErrorEmpty(value);
    return !value;
  });
  return _isErrorEmpty(errors);
};

export const filterRows = (rows, entity, enabledChecksMap) => _filter(rows, row => (!enabledChecksMap[row] || enabledChecksMap[row](entity)));

export const filterEnabledLayouts = layouts => _filter(layouts, layout => (_isUndefined(layout.enabled) || layout.enabled) && layout.rows.length);
