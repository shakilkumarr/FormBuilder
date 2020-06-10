/* eslint-disable react/prop-types */
import React, { PureComponent } from 'react';
import { createSelector, defaultMemoize } from 'reselect';

import _reduce from 'lodash/reduce';
import _property from 'lodash/property';
import _flatMap from 'lodash/flatMap';
import _flow from 'lodash/flow';
import actionTypes from 'constants/actionTypes';

const getRules = fieldIds => (...rules) => _reduce(fieldIds, (fieldsMap, fieldId, index) => {
  if (!rules[index]) return fieldsMap;
  return Object.assign(fieldsMap, { [fieldId]: rules[index] });
}, {});

const createFieldRuleList = fieldIds => createSelector(
  fieldIds.map(id => _flow(_property(`${id}`), _property('renderOptions.validators'))),
  getRules(fieldIds),
);

const callActionOnSectionChange = () => defaultMemoize((rules, onAction) => {
  onAction({
    type: actionTypes.ON_RULE_CHANGE,
    payload: { rules },
  });
});

const getFieldIdsFromSection = sections => _flatMap(sections, 'fieldIds');

const wrapWithValidator = ComposedComponent => class WithValidator extends PureComponent {
  constructor(props) {
    super(props);
    this.callActionOnRuleChange = callActionOnSectionChange();
    const ruleListCreator = createFieldRuleList(getFieldIdsFromSection(props.sections));
    this.callActionOnRuleChange(ruleListCreator(props.fields), props.onAction);
    this.state = {
      sections: props.sections,
      ruleListCreator,
    };
  }

  static getDerivedStateFromProps(nextProps, nextState) {
    if (nextState.sections !== nextProps.sections) {
      return {
        sections: nextProps.sections,
        ruleListCreator: createFieldRuleList(getFieldIdsFromSection(nextProps.sections)),
      };
    }
    return null;
  }

  render() {
    const { props, state } = this;
    const rules = state.ruleListCreator(props.fields);
    this.callActionOnRuleChange(rules, props.onAction);
    return (
      <ComposedComponent
        {...props}
        rules={rules}
      />
    );
  }
};

export default wrapWithValidator;
