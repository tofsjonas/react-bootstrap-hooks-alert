import React, { useContext, useEffect, useState, useRef } from 'react'
import Alert from 'react-bootstrap/Alert'

import { DELETE_ALERT, AlertType, AlertContext, AlertTimeouts } from './AlertContext'

export type AlertItemProps = {
  alert: AlertType
}

const AlertItem = ({ alert }: AlertItemProps) => {
  const { dispatch, timeouts } = useContext(AlertContext)
  const [show, setShow] = useState(true)

  const delete_timer = useRef<number>()
  const timeout_timer = useRef<number>()

  const { type, message, id } = alert

  const handleCloseClick = () => {
    setShow(false)
  }

  // figure out when and if to remove it
  useEffect(() => {
    const type_key = type as keyof AlertTimeouts
    const timer = timeout_timer.current
    let temp

    if (type && timeouts && type_key in timeouts) {
      temp = timeouts[type_key]
    }

    if ('timeout' in alert) {
      temp = alert.timeout
    }

    if (temp) {
      window.clearTimeout(timer)
      timeout_timer.current = window.setTimeout(() => {
        setShow(false)
      }, temp)
    }

    return () => {
      window.clearTimeout(timer)
    }
  }, [timeouts, type, alert, alert.timeout])

  // remove from context
  useEffect(() => {
    const timer = delete_timer.current
    window.clearTimeout(timer)
    if (show === false) {
      delete_timer.current = window.setTimeout(() => {
        dispatch({
          type: DELETE_ALERT,
          payload: id,
        })
      }, 3000)
    }
    return () => {
      window.clearTimeout(timer)
    }
  }, [show, dispatch, id])

  return (
    <Alert show={show} variant={type} dismissible={true} onClose={handleCloseClick}>
      {message}
    </Alert>
  )
}

export default AlertItem
