import React, { useContext, useEffect, useState, useRef } from 'react'
import Alert from 'react-bootstrap/Alert'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { DELETE_ALERT, AlertType, AlertContext, AlertTimeouts } from './AlertContext'
type AlertProps = {
  alert: AlertType
}

const AlertItem = ({ alert }: AlertProps) => {
  const { dispatch, timeouts } = useContext(AlertContext)
  const [show, setShow] = useState(true)
  const delete_timer = useRef<number>()
  const timeout_timer = useRef<number>()

  const { type, message, id, timeout } = alert

  const handleCloseClick = () => {
    setShow(false)
  }

  useEffect(() => {
    const type_key = type as keyof AlertTimeouts
    const timer = timeout_timer.current

    const temp = timeout || (type && timeouts && timeouts[type_key])

    if (temp) {
      window.clearTimeout(timer)
      timeout_timer.current = window.setTimeout(() => {
        setShow(false)
      }, temp)
    }

    return () => {
      window.clearTimeout(timer)
    }
  }, [timeouts, type, timeout])

  useEffect(() => {
    const timer = delete_timer.current
    window.clearTimeout(timer)
    if (show === false) {
      delete_timer.current = window.setTimeout(() => {
        dispatch({
          type: DELETE_ALERT,
          payload: id,
        })
      }, 1700)
    }
    return () => {
      window.clearTimeout(timer)
    }
  }, [show, dispatch, id])

  return (
    <Alert variant={type} dismissible={true} show={show} onClose={handleCloseClick}>
      {message}
    </Alert>
  )
}

type AlertOutletProps = {
  className?: string
}

const AlertOutlet = ({ className }: AlertOutletProps) => {
  const { alerts } = useContext(AlertContext)
  return (
    <Container className={className || 'alert-outlet'}>
      <Row>
        <Col>
          {alerts.map((alert) => (
            <AlertItem key={alert.id} alert={alert} />
          ))}
        </Col>
      </Row>
    </Container>
  )
}

export default AlertOutlet
