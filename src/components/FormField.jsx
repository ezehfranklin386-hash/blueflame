import React from 'react';

function FormField({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  required = false,
  minValue,
  ...props
}) {
  return (
    <div className="form-group">
      <label htmlFor={id}>{label}</label>
      {type === 'textarea' ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          required={required}
          {...props}
        ></textarea>
      ) : (
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          aria-describedby={error ? `${id}-error` : undefined}
          aria-invalid={!!error}
          required={required}
          min={minValue}
          {...props}
        />
      )}
      <span className="field-error" id={`${id}-error`} aria-live="assertive">
        {error}
      </span>
    </div>
  );
}

export default FormField;
