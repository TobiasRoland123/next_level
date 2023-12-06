import { motion } from 'framer-motion';
import { useState } from 'react';
import { useController } from 'react-hook-form';

// @ts-ignore
const ControlledEditableField = props => {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController(props);

  const [hasHover, setHasHover] = useState(false);
  const [selected, setSelected] = useState(false);

  return (
    <motion.div
      onHoverStart={e => setHasHover(true)}
      onHoverEnd={e => setHasHover(false)}
      className="relative"
    >
      <input
        className="flex h-10 w-full rounded bg-contrastCol px-3 py-2 border-b-transparent border-b-2 text-sm file:border-0 transition ease-in duration-300 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:border-b-2 focus-visible:border-secondaryCol disabled:cursor-not-allowed disabled:opacity-50"
        {...field}
        value={field.value}
        onChange={field.onChange}
        onFocus={e => setSelected(true)}
        onBlur={e => setSelected(false)}
        placeholder={props?.placeholder}
      />
    </motion.div>
  );
};

ControlledEditableField.displayName = 'ControlledEditableField';

export default ControlledEditableField;
