import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const UploadFieldset = ({ id, name, value, label, onChange, error }) => {
  return (
    <div className="form-group">
      <label className="control-label">{label}</label>
      <fieldset className="form-group custom-file">
        <input
          type="file"
          id={id}
          className={classnames('custom-file-input', { 'is-invalid': error })}
          name={name}
          onChange={onChange}
        />
        <label className="custom-file-label" htmlFor={id}>
          {value ? (value.name ? value.name : '') : ''}
        </label>
        {error && <div className="invalid-feedback">{error}</div>}
      </fieldset>
    </div>
  );
};

UploadFieldset.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default UploadFieldset;
