import React from 'react';
import PropTypes from 'prop-types';

const CheckboxGroupFieldset = ({ onChange, options, name, checkedOpt }) => {
  return (
    <fieldset className="form-group">
      {options.map((option, i) => (
        <div className="form-check form-check-inline" key={i}>
          <input
            className="form-check-input"
            type="checkbox"
            name={name}
            value={option.value}
            onChange={onChange}
            checked={
              JSON.stringify(checkedOpt).indexOf(option.value.toString()) === -1
                ? false
                : true
            }
          />
          <label
            className="form-check-label form-check-icons"
            htmlFor={option.value}
            title={option.title}
          >
            <i className={option.icon} />
          </label>
        </div>
      ))}
      ;
    </fieldset>
  );
};

CheckboxGroupFieldset.propTypes = {
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired,
  name: PropTypes.string,
  stateValue: PropTypes.array
};

export default CheckboxGroupFieldset;
