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
  const [class_name, setClassName] = useState('')

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
      setClassName('remove-alert-item') // so transition works
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
    <Alert className={class_name} variant={type} dismissible={true} onClose={handleCloseClick}>
      {message}
    </Alert>
  )
}

type AlertOutletProps = {
  className?: string
}

const AlertOutlet = (props: AlertOutletProps) => {
  const { alerts } = useContext(AlertContext)
  return (
    <span className={props.className || 'alert-outlet'}>
      <Container>
        {alerts.map((alert) => (
          <Row key={alert.id}>
            <Col>
              <AlertItem alert={alert} />
            </Col>
          </Row>
        ))}
      </Container>
    </span>
  )
}

export default AlertOutlet
