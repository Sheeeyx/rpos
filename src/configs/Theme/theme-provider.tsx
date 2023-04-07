import { lazy, Suspense } from "react";
import { useTheme } from "../../hooks/use-theme";

const DarkTheme = import("./dark-theme/ThemeDark") as any;
const LightTheme = import("./light-theme/LightTheme") as any;

interface children {
  children: any
}

export const ThemeProvider: React.FC<children> = ({ children }) => {
  const [darkMode] = useTheme();

  return (
    <>
      <Suspense fallback={<span />}>
        {darkMode ? <DarkTheme /> : <LightTheme />}
      </Suspense>
      {children}
    </>
  );
};