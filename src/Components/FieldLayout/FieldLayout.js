import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import _unary from 'lodash/unary';

import { EMPTY_ARRAY, EMPTY_OBJECT } from 'constants/app.constants';
import {
  fieldsObjectOf,
  valuesObjectOf,
  errorsObjectOf,
  rowOneOfType,
  warningObjectOf,
} from 'utils/propTypes';

import styles from './fieldLayout.module.css';

function getSizeClassName(size) {
  return size ? styles[`flex-item-${size}`] : '';
}


class FieldLayout extends PureComponent {
  static displayName = 'Row';

  constructor(props) {
    super(props);
    this.unaryRenderRow = _unary(this.renderRow);
  }

  renderField(fieldId, className = '') {
    const { props } = this;
    const field = props.fields[fieldId];
    const Field = field.renderer;
    const renderOptions = field.renderOptions || EMPTY_OBJECT;
    const fieldClassName = `${getSizeClassName(renderOptions.size)} ${renderOptions.fieldClassName || ''} ${styles.fieldC} ${className}`;
    if (!field || !Field) return null;

    return (
      <Field
        {...renderOptions}
        fieldClassName={fieldClassName}
        id={fieldId}
        key={fieldId}
        error={props.errors[fieldId]}
        value={props.values[fieldId]}
        warning={props.warnings[fieldId]}
        onAction={props.onAction}
      />
    );
  }

  renderRow = (row, className) => {
    if (typeof row === 'string') {
      return this.renderField(row, className);
    }

    return (
      <div id={row.id} className={cx(styles.columnContainer, row.className)}>
        {row.columns.map(this.renderColumn)}
      </div>
    );
  };

  renderColumn = (column, index) => {
    if (typeof column === 'string') {
      return this.renderField(column);
    }

    return (
      <div key={index} className={cx(styles.rowContainer, column.className)}>
        {column.rows.map(this.unaryRenderRow)}
      </div>
    );
  };

  render() {
    const { row } = this.props;
    return this.renderRow(row, styles.columnContainer);
  }
}

FieldLayout.propTypes = {
  row: rowOneOfType,
  fields: fieldsObjectOf,
  values: valuesObjectOf,
  errors: errorsObjectOf,
  warnings: warningObjectOf,
  onAction: PropTypes.func.isRequired,
};

FieldLayout.defaultProps = {
  row: EMPTY_ARRAY,
  fields: EMPTY_OBJECT,
  values: EMPTY_OBJECT,
  errors: EMPTY_OBJECT,
  warnings: EMPTY_OBJECT,
};

export default FieldLayout;
