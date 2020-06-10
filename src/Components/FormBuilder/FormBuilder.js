import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';

import _map from 'lodash/map';
import _isEmpty from 'lodash/isEmpty';
import _throttle from 'lodash/throttle';
import _noop from 'lodash/noop';

import { EMPTY_ARRAY, EMPTY_OBJECT } from 'constants/app.constants';
import { validate as ruleValidator } from 'utils/ruleValidator';
import Section from 'Components/Section';
import withGetters from 'Components/hoc/withGetters';
import withProcessedSections from 'Components/hoc/withProcessedSections';
import withFieldValidator from 'Components/hoc/withFieldValidator';
import {
  fieldsObjectOf,
  valuesObjectOf,
  errorsObjectOf,
  warningObjectOf,
} from 'utils/propTypes';

import { getFormErrors } from 'utils/general';
import actionTypes from 'constants/actionTypes';

import './formBuilder.css';
import { Container } from './formBuilder.style';

const handleErrors = async (
  errorPromiseByFieldId,
  { onAction, prevErrors }
) => {
  if (_isEmpty(errorPromiseByFieldId)) return;
  onAction({
    type: actionTypes.VALIDATION_IN_PROGRESS,
    payload: { errorPromiseByFieldId },
  });
  const errors = await getFormErrors(errorPromiseByFieldId, prevErrors);
  onAction({ type: actionTypes.VALIDATION_SUCCESS, payload: { errors } });
};

const handleThrottledError = _throttle(handleErrors, 200);

const validateChangedFields = ({ shouldBubbleAction }) => ({
  action,
  rules,
  values: allValues,
  onAction,
  errors,
  shouldAvoidFieldValidation,
}) => {
  const {
    payload: { id, value, additional },
  } = action;
  const extraAdditionalProps = { ...additional, prevErrors: errors };
  if (!shouldAvoidFieldValidation) {
    const promiseByFieldId = ruleValidator({ [id]: value }, allValues, rules, {
      shouldValidatedOnValues: true,
      additional: extraAdditionalProps,
    });
    handleThrottledError(promiseByFieldId, { onAction, prevErrors: errors });
  }
  if (!shouldBubbleAction) return;
  onAction(action);
};

const ON_ACTION_TYPE_VS_INTERCEPTOR = {
  [actionTypes.ON_FIELD_CHANGE]: validateChangedFields({
    shouldBubbleAction: true,
  }),
  [actionTypes.VALIDATE_FIELD]: validateChangedFields({
    shouldBubbleAction: false,
  }),
};


class Form extends PureComponent {
  handleAction = (action) => {
    const { props } = this;
    const funcToExec = ON_ACTION_TYPE_VS_INTERCEPTOR[action.type];
    if (!funcToExec) return props.onAction(action);
    return funcToExec({ ...props, action });
  };

  renderSection = (section, sectionIndex) => {
    const { props } = this;
    return (
      <Section
        section={section}
        id={sectionIndex}
        key={sectionIndex}
        rows={section.rows}
        fields={props.fieldsGetters[sectionIndex](props.fields)}
        errors={props.errorsGetters[sectionIndex](props.errors)}
        warnings={props.warningsGetters[sectionIndex](props.warnings)}
        values={props.valuesGetters[sectionIndex](props.values)}
        onAction={this.handleAction}
      />
    );
  };

  render() {
    const { props } = this;
    return (
      <Container className={props.className}>
        {_map(props.sections, this.renderSection)}
      </Container>
    );
  }
}

Form.propTypes = {
  onAction: PropTypes.func,
  fieldsGetters: PropTypes.array.isRequired,
  errorsGetters: PropTypes.array.isRequired,
  warningsGetters: PropTypes.array.isRequired,
  valuesGetters: PropTypes.array.isRequired,
  sections: PropTypes.array.isRequired,
  className: PropTypes.string,
  fields: fieldsObjectOf,
  values: valuesObjectOf,
  errors: errorsObjectOf,
  warnings: warningObjectOf,
};

Form.defaultProps = {
  onAction: _noop,
  fields: EMPTY_OBJECT,
  values: EMPTY_OBJECT,
  errors: EMPTY_OBJECT,
  warnings: EMPTY_OBJECT,
  className: '',
};

Form.displayName = 'FormBuilder';

const FormBuilder = compose(
  withProcessedSections,
  withFieldValidator,
  withGetters('sections'),
)(Form);

FormBuilder.propTypes = {
  sections: PropTypes.object,
  fields: PropTypes.object,
  values: PropTypes.object,
  warnings: PropTypes.object,
  errors: PropTypes.object,
  className: PropTypes.string,
  shouldAvoidFieldValidation: PropTypes.bool,
};

FormBuilder.defaultProps = {
  sections: EMPTY_ARRAY,
  fields: EMPTY_OBJECT,
  values: EMPTY_OBJECT,
  warnings: EMPTY_OBJECT,
  errors: EMPTY_OBJECT,
  className: '',
  shouldAvoidFieldValidation: false,
};

export { actionTypes };
export default FormBuilder;
