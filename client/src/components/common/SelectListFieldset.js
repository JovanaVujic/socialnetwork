import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const SelectListFieldset = ({
  name,
  value,
  label,
  error,
  onChange,
  options
}) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <fieldset className="form-group">
      <label htmlFor={name} className="control-label">
        {label}
      </label>

      <select
        className={classnames('form-control', {
          'is-invalid': error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </fieldset>
  );
};

SelectListFieldset.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
};

export default SelectListFieldset;
