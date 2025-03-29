import styled from 'styled-components'

export default function Footer() {
  return (
    <SiteFooter>
      <Container>
        Portfolio by <b>Ida Öhlén</b>
      </Container>
    </SiteFooter>
  )
}

const SiteFooter = styled.footer`
  padding: 2rem;
`

const Container = styled.div`
  padding: 1rem 2rem;
  margin: 0 auto;
  text-align: right;
  opacity: .4;
`
