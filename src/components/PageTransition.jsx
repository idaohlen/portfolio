import { motion } from 'motion/react'

export default function PageTransition({ children, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      // onExitComplete={() => window.scrollTo(0, 0)}
      transition={{ duration: 0.5 }}
      style={{flex: '1', display: 'flex'}}
      {...props}
    >
      {children}
    </motion.div>
  )
}