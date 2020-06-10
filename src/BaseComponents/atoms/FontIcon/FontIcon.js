import React, { PureComponent } from 'react';
import { defaultMemoize } from 'reselect';
import PropTypes from 'prop-types';
import _values from 'lodash/values';
import cx from 'classnames';

// Constants
import { SIZES, STYLES } from './constants';

class FontIcon extends PureComponent {
  static SIZES = SIZES;

  getIconStyle = defaultMemoize((color, size) => ({
    color,
    ...STYLES[size],
  }))

  render() {
    const {
      children,
      className,
      size,
      color,
      ...restProps
    } = this.props;
    const iconClassName = cx(className, children);

    return (
      <div
        className={iconClassName}
        style={this.getIconStyle(color, size)}
        {...restProps}
      />
    );
  }
}

FontIcon.propTypes = {
  className: PropTypes.string,
  size: PropTypes.oneOf(_values(SIZES)),
  children: PropTypes.string,
  color: PropTypes.string,
};

FontIcon.defaultProps = {
  className: '',
  size: SIZES.MD,
  children: '',
  color: '',
};

export default FontIcon;
