import React from 'react';
import PropTypes from 'prop-types';

import { EMPTY_OBJECT } from 'constants/app.constants';

import {
  Heading1,
  Heading2,
  Heading3,
  Heading4,
  Heading5,
  Heading1Regular,
  Heading2Regular,
  Heading3Regular,
  Heading4Regular,
  Heading5Regular,
  RequiredLabel,
  Container,
} from './heading.style';

const sizes = {
  1: Heading1,
  2: Heading2,
  3: Heading3,
  4: Heading4,
  5: Heading5,
};

const regularSizes = {
  1: Heading1Regular,
  2: Heading2Regular,
  3: Heading3Regular,
  4: Heading4Regular,
  5: Heading5Regular,
};

const Heading = (props) => {
  const {
    size, children, regular, className, style, inline, required, id, sectiontype, ...rest
  } = props;

  const Component = regular ? regularSizes[size] : sizes[size];
  return (
    <Container>
      <Component {...rest} sectiontype={sectiontype} style={style} id={id}>{children}</Component>
      {required && <RequiredLabel />}
    </Container>
  );
};

Heading.propTypes = {
  size: PropTypes.oneOf([1, 2, 3, 4, 5]),
  children: PropTypes.node,
  regular: PropTypes.bool,
  inline: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  id: PropTypes.string,
  style: PropTypes.object,
  sectiontype: PropTypes.string,
};

Heading.defaultProps = {
  size: 1,
  children: undefined,
  regular: false,
  inline: false,
  required: false,
  className: '',
  id: '',
  style: EMPTY_OBJECT,
  sectiontype: '',
};

export default Heading;
