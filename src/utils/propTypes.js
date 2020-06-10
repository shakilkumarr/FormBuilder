import PropTypes from 'prop-types';

export const fieldsObjectOf = PropTypes.objectOf(PropTypes.shape({
  renderer: PropTypes.func,
  helper: PropTypes.shape({
    renderOptions: PropTypes.object,
  }),
}));

export const rowOneOfType = PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
  columns: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.shape({
    rows: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.string, PropTypes.object])),
    className: PropTypes.string,
  })])),
  className: PropTypes.string,
})]);

export const rowsArrayOf = PropTypes.arrayOf(rowOneOfType);

export const valuesObjectOf = PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.array]));

export const errorsObjectOf = PropTypes.oneOfType([PropTypes.string, PropTypes.array]);

export const warningObjectOf = PropTypes.objectOf(PropTypes.oneOfType([PropTypes.string, PropTypes.array]));
