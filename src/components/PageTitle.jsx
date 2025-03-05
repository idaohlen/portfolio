import { Icon } from '@iconify/react'

export default function Component({title, icon}) {

  return (
    <h1 className='flex gap-3'>
      {icon && <Icon icon={icon} />}
      <span>{title}</span>
    </h1>
  )
}