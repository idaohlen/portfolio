import styled from 'styled-components'

const SiteFooter = styled.footer`
  padding: 2rem;
`

const Container = styled.div`
  padding: 1rem 2rem;
  margin: 0 auto;
  border-radius: 10rem;
  width: fit-content;
  background: #ffffff19;
  border: .5px solid #ffffffb9;
`

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <SiteFooter>
      <Container>
        Ida Öhlén © {currentYear}
      </Container>
    </SiteFooter>
  )
}