import React, { createContext, useReducer } from 'react'
// export const SET_ALERTS = 'SET_ALERTS'
export const ADD_ALERT = 'ADD_ALERT'
// export const UPDATE_ALERT = 'UPDATE_ALERT'
export const DELETE_ALERT = 'DELETE_ALERT'

export type AlertType = {
  id: string
  message: React.ReactNode
  type: string
  timeout?: number
}

export type AlertTimeouts = {
  primary?: number
  secondary?: number
  success?: number
  danger?: number
  warning?: number
  info?: number
  light?: number
  dark?: number
}

type State = {
  timeouts?: AlertTimeouts
  alerts: AlertType[]
}

type Action =
  | { type: 'ADD_ALERT'; payload: AlertType }
  // | { type: 'UPDATE_ALERT'; payload: Alert }
  | { type: 'DELETE_ALERT'; payload: string }

const initialState: State = {
  timeouts: {},
  alerts: [
    // {
    //   id: '1',
    //   message: 'Success',
    //   type: 'success',
    // },
    // {
    //   id: '2',
    //   message: 'Warning',
    //   type: 'warning',
    // },
    // {
    //   id: '3',
    //   message: 'Danger',
    //   type: 'danger',
    // },
  ],
}

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ADD_ALERT:
      return { ...state, alerts: [...state.alerts, action.payload] }
    case DELETE_ALERT:
      return { ...state, alerts: state.alerts.filter((obj) => obj.id !== action.payload) }
    default:
      return state
  }
}

export type ContextProps = State & {
  dispatch: React.Dispatch<Action>
}

export const AlertContext = createContext<ContextProps>({
  ...initialState,
  dispatch: () => null,
})

// export const AlertContext = React.createContext<Partial<ContextProps>>({})

type ProviderProps = {
  children: React.ReactNode
  timeouts?: AlertTimeouts
}

// export type Props = {
//   children: ReactNode;
//   axiosInstance: AxiosInstance;
// };

const AlertProvider = ({ children, timeouts }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, timeouts })

  return <AlertContext.Provider value={{ ...state, dispatch }}>{children}</AlertContext.Provider>
}
export default AlertProvider
