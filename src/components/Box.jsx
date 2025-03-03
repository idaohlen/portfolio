import styled from 'styled-components'

const Container = styled.div`
  margin: 2rem auto;
  padding: .5rem 1.4rem;
  border-radius: 10px;

  p {
    margin-block: 0;
  }
`

export default function Box({children, className}) {


  return (
    <Container className={`bg-sky-200/20 ${className}`}>
      { children }
    </Container>
  )
}