
import * as  React from 'react'
import { styled } from '../styles'
import Container from './Container'

import Spinner from './Spinner'

const PageLoader = () => {
  return (
    <StyledPageLoader>
      <Spinner />
    </StyledPageLoader>
  )
}

export default PageLoader

const StyledPageLoader = styled(Container, {
  height: 'calc(100vh - 16px)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})