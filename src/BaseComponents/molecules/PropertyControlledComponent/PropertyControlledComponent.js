import PropTypes from 'prop-types';

const PropertyControlledComponent = ({ controllerProperty, children }) => {
  if (!controllerProperty) return null;

  return children;
};

PropertyControlledComponent.prototypes = {
  controllerProperty: PropTypes.bool,
};

PropertyControlledComponent.defaultProps = {
  controllerProperty: false,
};

export default PropertyControlledComponent;
