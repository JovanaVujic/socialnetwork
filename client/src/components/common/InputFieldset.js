import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const InputFieldset = ({
  type,
  name,
  label,
  value,
  onChange,
  placeholder,
  disabled,
  error
}) => {
  return (
    <fieldset className="form-group">
      <label htmlFor={name} className="control-label">
        {label}
      </label>
      <input
        type={type}
        className={classnames('form-control', { 'is-invalid': error })}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </fieldset>
  );
};

InputFieldset.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  error: PropTypes.string
};

InputFieldset.defaultProps = {
  type: 'text'
};

export default InputFieldset;
