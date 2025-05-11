import { AuthProvider } from "@/contexts/AuthContext";
import { ThemeProvider } from "./theme-provider";

const Providers = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    <AuthProvider>{children}</AuthProvider>
  </ThemeProvider>
);

export default Providers;
