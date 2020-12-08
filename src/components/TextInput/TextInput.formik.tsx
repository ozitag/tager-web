import React, { useCallback } from 'react';
import { useField, FieldConfig } from 'formik';

import FormControl from '@/components/FormControl';

import TextInput from './TextInput';

type FormikFieldProps = Pick<FieldConfig, 'name' | 'type'>;
type InputProps = Omit<React.ComponentProps<typeof TextInput>, 'name' | 'type'>;

type Props = FormikFieldProps &
  InputProps & {
    parse?: (value: string, previousValue: string) => string;
    hideError?: boolean;
    error?: string;
  };

function TextInputFormik({
  className,
  name,
  id,
  parse,
  error: customError,
  type = 'text',
  hideError,
  ...rest
}: Props) {
  const [field, meta, helpers] = useField<string>({ name, type });

  const error = customError ?? (meta.touched ? meta.error : '');

  const { value, onChange, onBlur } = field;
  const { setValue } = helpers;

  const handleChange = useCallback(
    (event) => {
      if (parse) {
        const parsedValue = parse(event.target.value, value);
        if (parsedValue !== value) {
          setValue(parsedValue);
        }
      } else {
        onChange(event);
      }
    },
    [parse, value, setValue, onChange]
  );

  return (
    <FormControl className={className} error={error}>
      <TextInput
        id={id}
        invalid={Boolean(error)}
        name={name}
        type={type}
        value={value}
        onBlur={onBlur}
        onChange={handleChange}
        {...rest}
      />
    </FormControl>
  );
}

export default TextInputFormik;
