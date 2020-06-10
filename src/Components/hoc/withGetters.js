import React, { PureComponent } from 'react';
import { createSelector } from 'reselect';

import _property from 'lodash/property';
import _identity from 'lodash/identity';


/**
 *
 * @param fieldIds: arrayOf(string)
 * returns a getter fn which is to be invoked with the universalMap
 *
 * e.g. const getter = createGetter([1,2]);
 * const universalMap = {1: 'foo', 2: 'bar', 3: 'foobar', 4: 'barfoo', 5: 'foofoo'};
 * const relevantMap = getter(universalMap); // {1: 'foo', 2: 'bar'}
 */
const createGetter = fieldIds => !fieldIds
  ? _identity
  : createSelector(
    fieldIds.map(_property),
    (...fields) => fieldIds.reduce((fieldsMap, fieldId, index) => Object.assign(fieldsMap, { [fieldId]: fields[index] }), {})
  );

const createGetterForUnit = unit => createGetter(typeof unit !== 'string' && unit.fieldIds);

const createGetterFunctions = unitKey => createSelector(
  _property(unitKey),
  data => ({
    valuesGetters: data.map(createGetterForUnit),
    warningsGetters: data.map(createGetterForUnit),
    errorsGetters: data.map(createGetterForUnit),
    fieldsGetters: data.map(createGetterForUnit),
  })
);

const withGetters = unitKey => ComposedComponent => class WithGetters extends PureComponent {
  constructor(props) {
    super(props);
    this.getterFuncs = createGetterFunctions(unitKey);
  }

  render() {
    const { props } = this;
    return (
      <ComposedComponent
        {...this.props}
        {...this.getterFuncs(props)}
      />
    );
  }
};

export default withGetters;
