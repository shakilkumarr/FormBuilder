import React, { PureComponent } from 'react';
import update from 'immutability-helper';
import { createSelector } from 'reselect';

import _isEmpty from 'lodash/isEmpty';
import _property from 'lodash/property';
import _reduce from 'lodash/reduce';

import { getFieldIds } from 'utils/general';


const getUpdateConfig = (unit) => {
  if (typeof unit === 'string') return {};
  const childConfig = _reduce((unit.rows || unit.columns), (conf, unitItem, index) => {
    const updConf = getUpdateConfig(unitItem);
    if (!_isEmpty(updConf)) {
      // eslint-disable-next-line no-param-reassign
      conf[unit.rows ? 'rows' : 'columns'] = { [index]: updConf };
    }
    return conf;
  }, {});
  return { fieldIds: { $set: getFieldIds(unit) }, ...childConfig };
};

const getInsertedFieldIdsSection = sections => _reduce(sections, ((result, layout) => {
  const updConf = getUpdateConfig(layout);
  result.push(update(layout, updConf));
  return result;
}, []));

const createInsertedFieldIdsSection = () => createSelector(
  _property('sections'),
  getInsertedFieldIdsSection,
);

const wrapProcessedFieldGroups = ComposedComponent => class withProcessedFieldGroups extends PureComponent {
  constructor(props) {
    super(props);
    this.layoutsGenerator = createInsertedFieldIdsSection();
  }

  render() {
    const { props } = this;
    return (
      <ComposedComponent
        {...props}
        sections={this.layoutsGenerator(props)}
      />
    );
  }
};

export default wrapProcessedFieldGroups;
