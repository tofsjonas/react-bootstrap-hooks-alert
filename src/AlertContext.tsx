import React, { createContext, useReducer } from 'react'
export const ADD_ALERT = 'ADD_ALERT'
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

type Action = { type: 'ADD_ALERT'; payload: AlertType } | { type: 'DELETE_ALERT'; payload: string }

const initialState: State = {
  timeouts: {},
  alerts: [],
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

type ProviderProps = {
  children: React.ReactNode
  timeouts?: AlertTimeouts
}

const AlertProvider = ({ children, timeouts }: ProviderProps) => {
  const [state, dispatch] = useReducer(reducer, { ...initialState, timeouts })
  return <AlertContext.Provider value={{ ...state, dispatch }}>{children}</AlertContext.Provider>
}
export default AlertProvider
