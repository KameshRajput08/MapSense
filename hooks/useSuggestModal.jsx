import { create } from "zustand";

const useSuggestModal = create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useSuggestModal;
