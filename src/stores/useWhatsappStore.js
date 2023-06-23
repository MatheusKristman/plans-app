import { create } from "zustand";

const useWhatsappStore = create((set) => ({
  isDescHovered: false,
  setDescHovered: () =>
    set((state) => {
      if (window.innerWidth >= 1024) {
        return { isDescHovered: true };
      }
      return { isDescHovered: state.isDescHovered };
    }),
  unsetDescHovered: () =>
    set(() => {
      if (window.innerWidth >= 1024) {
        return { isDescHovered: false };
      }
      return { isDescHovered: state.isDescHovered };
    }),
  isLinkEnabled: false,
  enableLink: () => set(() => ({ isLinkEnabled: true })),
  disableLink: () => set(() => ({ isLinkEnabled: false })),
}));

export default useWhatsappStore;
