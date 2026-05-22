'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const UIContext = createContext(null);

export function UIProvider({ children }) {
  // Mobile nav
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = useCallback(() => setMobileMenuOpen((v) => !v), []);
  const closeMobileMenu = useCallback(() => setMobileMenuOpen(false), []);

  // Lead capture modal
  const [modalOpen, setModalOpen]         = useState(false);
  const [modalProperty, setModalProperty] = useState(null);

  const openModal = useCallback((property = null) => {
    setModalProperty(property);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setModalProperty(null);
  }, []);

  // Scroll lock when modal is open
  // (handled via CSS class on body in layout)

  const value = {
    mobileMenuOpen,
    toggleMobileMenu,
    closeMobileMenu,
    modalOpen,
    modalProperty,
    openModal,
    closeModal,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error('useUI must be used within UIProvider');
  return ctx;
}