import React, { createContext, PropsWithChildren, useMemo } from 'react';

interface FormGroupContextProps {
  inputId: string;
}

const FormGroupContext = createContext<FormGroupContextProps | undefined>(
  undefined
);

interface FormGroupProviderProps extends PropsWithChildren {
  inputId: string;
}

export function FormGroupProvider({
  inputId,
  children,
}: FormGroupProviderProps) {
  const value = useMemo(() => {
    return {
      inputId,
    };
  }, [inputId]);

  return (
    <FormGroupContext.Provider value={value}>
      {children}
    </FormGroupContext.Provider>
  );
}

export function useFormGroup() {
  return React.useContext(FormGroupContext);
}
