import { create } from 'zustand';
import gsap from 'gsap';

export interface ImageDetails {
  url: string;
  title: string;
  backstory: string;
  gear: string;
  settings: string;
}

interface AppState {
  isLoading: boolean;
  isTerminalOpen: boolean;
  isOverclocked: boolean;
  isDevMode: boolean;
  isRecruiterMode: boolean;
  isEStopped: boolean;
  activeImage: string | null;
  activeImageDetails: ImageDetails | null;
  openPositions: Record<string, boolean>;
  tripleClickCount: number;
  clickTimeoutRef: NodeJS.Timeout | null;
  
  toggleTerminal: () => void;
  setTerminalOpen: (isOpen: boolean) => void;
  toggleOverclock: () => void;
  setOverclock: (isOverclocked: boolean) => void;
  toggleDevMode: () => void;
  setDevMode: (isDevMode: boolean) => void;
  toggleRecruiterMode: () => void;
  toggleEStop: () => void;
  setActiveImage: (imageUrl: string | null) => void;
  setActiveImageDetails: (details: ImageDetails | null) => void;
  closeOverlays: () => void;
  setLoading: (isLoading: boolean) => void;
  togglePosition: (id: string) => void;
  registerSignatureClick: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  isLoading: true,
  isTerminalOpen: false,
  isOverclocked: false,
  isDevMode: false,
  isRecruiterMode: false,
  isEStopped: false,
  activeImage: null,
  activeImageDetails: null,
  openPositions: {},
  tripleClickCount: 0,
  clickTimeoutRef: null,
  
  toggleTerminal: () => set((state) => ({ isTerminalOpen: !state.isTerminalOpen })),
  setTerminalOpen: (isOpen) => set({ isTerminalOpen: isOpen }),
  
  toggleOverclock: () => set((state) => {
    const nextState = !state.isOverclocked;
    if (nextState) {
      document.body.classList.add('theme-overclock');
    } else {
      document.body.classList.remove('theme-overclock');
    }
    return { isOverclocked: nextState };
  }),
  setOverclock: (isOverclocked) => set({ isOverclocked }),
  
  toggleDevMode: () => set((state) => ({ isDevMode: !state.isDevMode })),
  setDevMode: (isDevMode) => set({ isDevMode }),

  toggleRecruiterMode: () => set((state) => ({ isRecruiterMode: !state.isRecruiterMode })),
  
  toggleEStop: () => set((state) => {
    const nextState = !state.isEStopped;
    if (nextState) {
      gsap.globalTimeline.pause();
    } else {
      gsap.globalTimeline.play();
    }
    return { isEStopped: nextState };
  }),
  
  setActiveImage: (imageUrl) => set({ activeImage: imageUrl }),
  setActiveImageDetails: (details) => set({ activeImageDetails: details }),
  
  closeOverlays: () => set({
    isDevMode: false,
    isTerminalOpen: false,
    activeImage: null,
    activeImageDetails: null
  }),

  setLoading: (isLoading) => set({ isLoading }),

  togglePosition: (id) => set((state) => ({
    openPositions: { ...state.openPositions, [id]: !state.openPositions[id] }
  })),

  registerSignatureClick: () => {
    set((state) => {
      if (state.clickTimeoutRef) clearTimeout(state.clickTimeoutRef);
      const newCount = state.tripleClickCount + 1;
      
      if (newCount >= 3) {
        return { tripleClickCount: 0, isDevMode: !state.isDevMode, clickTimeoutRef: null };
      }
      
      const timeout = setTimeout(() => {
        set({ tripleClickCount: 0, clickTimeoutRef: null });
      }, 1500);
      
      return { tripleClickCount: newCount, clickTimeoutRef: timeout };
    });
  }
}));
