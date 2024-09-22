import { createContext, useContext, useMemo } from "react";

const PathContext = createContext<{
  basePath?: string;
  locale?: string;
}>({});

const PathProvider: React.FC<{
  children: React.ReactNode;
  basePath: string;
  locale: string;
}> = ({ children, basePath, locale }) => {
  const contextValue = useMemo(() => {
    return { basePath, locale };
  }, [basePath, locale]);

  return (
    <PathContext.Provider value={contextValue}>{children}</PathContext.Provider>
  );
};

export default PathProvider;

export const usePathContext = () => useContext(PathContext);
