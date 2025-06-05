import React, { createContext, useContext, useReducer, ReactNode } from 'react';

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface AppState {
  contactSubmissions: ContactFormData[];
  isSubmitting: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'SUBMIT_CONTACT_START' }
  | { type: 'SUBMIT_CONTACT_SUCCESS'; payload: ContactFormData }
  | { type: 'SUBMIT_CONTACT_ERROR'; payload: string }
  | { type: 'SET_CONTACT_SUBMISSIONS'; payload: ContactFormData[] };

const initialState: AppState = {
  contactSubmissions: [],
  isSubmitting: false,
  error: null,
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | undefined>(undefined);

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SUBMIT_CONTACT_START':
      return {
        ...state,
        isSubmitting: true,
        error: null,
      };
    case 'SUBMIT_CONTACT_SUCCESS':
      return {
        ...state,
        isSubmitting: false,
        contactSubmissions: [...state.contactSubmissions, action.payload],
        error: null,
      };
    case 'SUBMIT_CONTACT_ERROR':
      return {
        ...state,
        isSubmitting: false,
        error: action.payload,
      };
    case 'SET_CONTACT_SUBMISSIONS':
      return {
        ...state,
        contactSubmissions: action.payload,
      };
    default:
      return state;
  }
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}; 