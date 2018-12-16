import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'

import { getData } from './selectors'
import { Row } from '../Layout'
import { Button, HeartbeatLoader } from 'blockchain-info-components'

const ButtonRow = styled(Row)`
  padding: 23px 32px;
`
const BigButton = styled(Button)`
  height: 72px;
  border-radius: 6px;
  font-size: 17px;
  font-weight: 400;
`

class SubmitButton extends React.PureComponent {
  render () {
    const {
      blockLockbox,
      disabled,
      disabledPending,
      hide,
      txError,
      volume,
      asyncValidating,
      dirty,
      error,
      submitting,
      handleSubmit
    } = this.props

    if (hide) return null

    return (
      <ButtonRow>
        <BigButton
          nature='primary'
          fullwidth
          onClick={handleSubmit}
          disabled={
            disabledPending ||
            disabled ||
            blockLockbox ||
            asyncValidating ||
            submitting ||
            !dirty ||
            volume === '0' ||
            !volume ||
            (volume && error) ||
            txError
          }
        >
          {!disabled && !asyncValidating && !submitting ? (
            <FormattedMessage
              id='scenes.exchange.exchangeform.swap'
              defaultMessage='Swap'
            />
          ) : (
            <HeartbeatLoader height='20px' width='20px' color='white' />
          )}
        </BigButton>
      </ButtonRow>
    )
  }
}

export default connect(getData)(SubmitButton)