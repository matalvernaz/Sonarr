import classNames from 'classnames';
import React, {
  Children,
  ComponentPropsWithoutRef,
  ReactNode,
  useId,
} from 'react';
import { Size } from 'Helpers/Props/sizes';
import { FormGroupProvider } from './FormGroupContext';
import styles from './FormGroup.css';

interface FormGroupProps extends ComponentPropsWithoutRef<'div'> {
  className?: string;
  children: ReactNode;
  size?: Extract<Size, keyof typeof styles>;
  advancedSettings?: boolean;
  isAdvanced?: boolean;
}

function FormGroup(props: FormGroupProps) {
  const {
    className = styles.group,
    children,
    size = 'small',
    advancedSettings = false,
    isAdvanced = false,
    ...otherProps
  } = props;

  const inputId = useId();

  if (!advancedSettings && isAdvanced) {
    return null;
  }

  const childProps = isAdvanced ? { isAdvanced } : {};

  return (
    <FormGroupProvider inputId={inputId}>
      <div className={classNames(className, styles[size])} {...otherProps}>
        {Children.map(children, (child) => {
          if (!React.isValidElement(child)) {
            return child;
          }

          return React.cloneElement(child, childProps);
        })}
      </div>
    </FormGroupProvider>
  );
}

export default FormGroup;
