import React from 'react';
import { FormattedMessage } from 'react-intl';

const CustomSelect = (props) => {
  const dispatchChangeEvent = (changeEvent) => {
    const event = new CustomEvent('customSelectChanged', {
      detail: { event: changeEvent },
    });
    window.dispatchEvent(event);
  };

  return (
    <div>
      <label>
        <FormattedMessage id={props.inputs.label ?? 'status.left'} />
      </label>
      <select
        name={props.inputs.name}
        className={props.inputs.className}
        value={props.inputs.value}
        onChange={dispatchChangeEvent}
      >
        {props.inputs?.options?.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CustomSelect;
