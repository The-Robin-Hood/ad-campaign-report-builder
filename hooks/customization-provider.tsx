import React from "react";

export const CustomizationContext = React.createContext({
  customization: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleCustomization: (_isCustomization: boolean) => {},
});
const CustomizationProvider = ({ children }: { children: React.ReactNode }) => {
  const [customization, setCustomization] = React.useState(false);

  const handleCustomization = (_isCustomization: boolean) =>
    setCustomization(_isCustomization);

  return (
    <CustomizationContext.Provider
      value={{
        customization,
        handleCustomization,
      }}
    >
      {children}
    </CustomizationContext.Provider>
  );
};

export default CustomizationProvider;
