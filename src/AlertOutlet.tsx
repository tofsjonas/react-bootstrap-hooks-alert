import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import { AlertContext } from './AlertContext'
import AlertItem from './AlertItem'

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
