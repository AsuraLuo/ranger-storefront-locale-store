import { createContext, useContext, useMemo } from "react";

const PathContext = createContext<{
  basePath?: string;
  locale?: string;
  whiteList?: string[];
}>({});

const PathProvider: React.FC<{
  children: React.ReactNode;
  basePath: string;
  locale: string;
  whiteList: string[];
}> = ({ children, basePath, locale, whiteList }) => {
  const contextValue = useMemo(() => {
    return { basePath, locale, whiteList };
  }, [basePath, locale, whiteList]);

  return (
    <PathContext.Provider value={contextValue}>{children}</PathContext.Provider>
  );
};

export default PathProvider;

export const usePathContext = () => useContext(PathContext);
