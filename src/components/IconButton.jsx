import { Button, Tooltip } from '@heroui/react'
import { Icon } from '@iconify/react'

export default function Component({ icon, onPress, label, buttonSize = 'sm', iconSize = '2xl', textColor = null, tooltipPos = 'top' }) {

  return (
    <Tooltip content={label} color='foreground' showArrow placement={tooltipPos}>
      <Button
        isIconOnly
        size={buttonSize}
        radius='sm'
        variant='light'
        onPress={onPress}
        className={textColor ? `text-${textColor}` : undefined}
      >
        <Icon icon={icon} className={`text-${iconSize}`} />
      </Button>
    </Tooltip>
  )
}