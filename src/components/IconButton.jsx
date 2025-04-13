import { Button, Tooltip } from '@heroui/react'
import { Icon } from '@iconify/react'

export default function Component({ icon, onPress, label, buttonSize = 'sm', iconSize = '2xl', textColor = null, bgColor = null, tooltipPos = 'top', className = null }) {

  return (
    <Tooltip content={label} color='foreground' showArrow placement={tooltipPos}>
      <Button
        isIconOnly
        size={buttonSize}
        radius='sm'
        variant='light'
        onPress={onPress}
        className={`
          ${textColor ? `text-${textColor}` : ''}
          ${bgColor ? `bg-${bgColor}` : ''}
          ${className}
          `}
      >
        <Icon icon={icon} className={`text-${iconSize}`} />
      </Button>
    </Tooltip>
  )
}