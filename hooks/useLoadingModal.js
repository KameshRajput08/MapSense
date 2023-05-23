import { create } from 'zustand';

const useLoadingModal = create((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false })
}));


export default useLoadingModal;