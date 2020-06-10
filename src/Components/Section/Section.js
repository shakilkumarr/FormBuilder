import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { defaultMemoize } from 'reselect';
import cx from 'classnames';

import _map from 'lodash/map';
import _isNil from 'lodash/isNil';
import _isFunction from 'lodash/isFunction';
import _noop from 'lodash/noop';

import { EMPTY_OBJECT, EMPTY_ARRAY } from 'constants/app.constants';
import PropertyControlledComponent from 'BaseComponents/molecules/PropertyControlledComponent';
import Heading from 'BaseComponents/atoms/Heading';

import FieldLayout from '../FieldLayout';
import withGetters from '../hoc/withGetters';

import {
  Container,
  Header,
  SubHeader,
} from './section.style';

class Section extends PureComponent {
  static displayName = 'Section';

  getHeader = defaultMemoize((headerLabel, headerClassName, values) => {
    if (_isNil(headerLabel)) return null;
    return (_isFunction(headerLabel) ? headerLabel(values) : <Heading size={3} className={cx(headerClassName)}>{headerLabel}</Heading>);
  });

  getPanelExpandedProp = defaultMemoize((isPanelExpanded, collapsiblePanelKey) => {
    if (isPanelExpanded) return [collapsiblePanelKey];
    return EMPTY_OBJECT;
  })

  renderFieldLayout = (row, rowIndex) => {
    const { props } = this;

    return (
      <FieldLayout
        row={row}
        key={row.key || rowIndex}
        fields={props.fieldsGetters[rowIndex](props.fields)}
        errors={props.errorsGetters[rowIndex](props.errors)}
        warnings={props.warningsGetters[rowIndex](props.warnings)}
        values={props.valuesGetters[rowIndex](props.values)}
        onAction={props.onAction}
      />
    );
  };

  renderSectionChildren = rows => _map(rows, this.renderFieldLayout);

  render() {
    const { props } = this;
    const { section } = props;
    const {
      label: headerLabel,
      className: headerClassName,
      hashId = '',
    } = section.header || EMPTY_OBJECT;
    const {
      label: subHeaderLabel,
      className: subHeaderClassName,
    } = section.subHeader || EMPTY_OBJECT;
    return (
      <Container id={hashId} data-id={section.id} className={section.className}>
        <PropertyControlledComponent controllerProperty={headerLabel}>
          <Header size={2} className={headerClassName}>{headerLabel}</Header>
        </PropertyControlledComponent>

        <PropertyControlledComponent controllerProperty={subHeaderLabel}>
          <SubHeader size={3} className={subHeaderClassName}>{subHeaderLabel}</SubHeader>
        </PropertyControlledComponent>

        <div className={section.sectionWrapperClassName}>
          {this.renderSectionChildren(section.rows)}
        </div>
      </Container>
    );
  }
}

Section.propTypes = {
  section: PropTypes.array.isRequired,
  fields: PropTypes.array,
  errors: PropTypes.array,
  warnings: PropTypes.array,
  values: PropTypes.array,
  fieldsGetters: PropTypes.array.isRequired,
  errorsGetters: PropTypes.array.isRequired,
  warningsGetters: PropTypes.array.isRequired,
  valuesGetters: PropTypes.array.isRequired,
  onAction: PropTypes.func,
};

Section.defaultProps = {
  fields: EMPTY_ARRAY,
  errors: EMPTY_ARRAY,
  warnings: EMPTY_ARRAY,
  values: EMPTY_ARRAY,
  onAction: _noop,
};

export default withGetters('rows')(Section);
