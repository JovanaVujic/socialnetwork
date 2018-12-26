import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const TextAreaFieldset = ({
  name,
  placeholder,
  value,
  label,
  error,
  onChange
}) => {
  return (
    <fieldset className="form-group">
      <label
        htmlFor={name}
        className={classnames('control-label', {
          'd-none': !label
        })}
      >
        {label}
      </label>
      <textarea
        className={classnames('form-control', {
          'is-invalid': error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </fieldset>
  );
};

TextAreaFieldset.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

export default TextAreaFieldset;
