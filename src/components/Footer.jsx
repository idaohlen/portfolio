import styled from 'styled-components'
import IconButton from '@/components/IconButton'
import config from '@/config'
import { handleRedirect } from '@/utils/utils'

const github = config.contactLinks.github;

export default function Footer() {
  return (
    <SiteFooter>
      <Container className='flex justify-end items-center gap-2'>
        <IconButton
          icon={github.icon}
          key={github.title}
          label='Portfolio source code'
          textColor='white'
          buttonSize='md'
          iconSize='2xl'
          onPress={() => handleRedirect(github.url)}
          tooltipPos='bottom'
        />
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
