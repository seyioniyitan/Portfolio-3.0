"use client";

import { createContext, useContext, useState } from "react";

type MobileMenuContextType = {
  open: boolean;
  setOpen: (v: boolean) => void;
};

const MobileMenuContext = createContext<MobileMenuContextType>({
  open: false,
  setOpen: () => {},
});

export function MobileMenuProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <MobileMenuContext.Provider value={{ open, setOpen }}>
      {children}
    </MobileMenuContext.Provider>
  );
}

export const useMobileMenu = () => useContext(MobileMenuContext);
