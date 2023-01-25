import React from "react";

type ContextValue = {
  isMenuOpen: boolean;
  toggleIsMenuOpen(): void;
}

const AppContext = React.createContext<ContextValue | null>(null);

export default AppContext;