import styled from 'styled-components'

export default function ExperienceList({items}) {

  return (
    <div>
      {items.map((item, i) => (
        <Item key={`${i}-${item.title}`}>
          <div><Title>{item.title}</Title> — <Place>{item.place}</Place> </div>
          <Location className='text-teal-200'>{item.location} ({item.date})</Location>
        </Item>
      ))}
    </div>
  )
}

const Item = styled.div`
  margin-block: 1rem;
`

const Title = styled.span`
  font-weight: 600;
`
const Place = styled.span`

`

const Location = styled.div`
  font-style: italic;
`