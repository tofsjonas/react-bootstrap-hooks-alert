import React, { useContext } from 'react'
import { ADD_ALERT, AlertContext } from './AlertContext'

const uniqueId = () => {
  return Date.now() + Math.random().toString().slice(2, 12)
}

type AlertOptions = {
  timeout?: number
  // dismissible?: boolean ....?
}

type UseAlert = {
  primary: (message: React.ReactNode, options?: AlertOptions) => void
  secondary: (message: React.ReactNode, options?: AlertOptions) => void
  success: (message: React.ReactNode, options?: AlertOptions) => void
  danger: (message: React.ReactNode, options?: AlertOptions) => void
  warning: (message: React.ReactNode, options?: AlertOptions) => void
  info: (message: React.ReactNode, options?: AlertOptions) => void
  light: (message: React.ReactNode, options?: AlertOptions) => void
  dark: (message: React.ReactNode, options?: AlertOptions) => void
}

const useAlert = (): UseAlert => {
  const { dispatch } = useContext(AlertContext)

  const exec = React.useCallback(
    (message: React.ReactNode, type: string, options?: AlertOptions) => {
      dispatch({
        type: ADD_ALERT,
        payload: {
          id: uniqueId(),
          type,
          message,
          ...options,
        },
      })
    },
    [dispatch],
  )

  const primary = React.useCallback(
    (message: React.ReactNode, options?: AlertOptions) => {
      exec(message, 'primary', options)
    },
    [exec],
  )
  const secondary = React.useCallback(
    (message: React.ReactNode, options?: AlertOptions) => {
      exec(message, 'secondary', options)
    },
    [exec],
  )

  const success = React.useCallback(
    (message: React.ReactNode, options?: AlertOptions) => {
      exec(message, 'success', options)
    },
    [exec],
  )
  const danger = React.useCallback(
    (message: React.ReactNode, options?: AlertOptions) => {
      exec(message, 'danger', options)
    },
    [exec],
  )
  const warning = React.useCallback(
    (message: React.ReactNode, options?: AlertOptions) => {
      exec(message, 'warning', options)
    },
    [exec],
  )
  const info = React.useCallback(
    (message: React.ReactNode, options?: AlertOptions) => {
      exec(message, 'info', options)
    },
    [exec],
  )
  const light = React.useCallback(
    (message: React.ReactNode, options?: AlertOptions) => {
      exec(message, 'light', options)
    },
    [exec],
  )
  const dark = React.useCallback(
    (message: React.ReactNode, options?: AlertOptions) => {
      exec(message, 'dark', options)
    },
    [exec],
  )

  return {
    primary,
    secondary,
    success,
    danger,
    warning,
    info,
    light,
    dark,
  }
}

export default useAlert
