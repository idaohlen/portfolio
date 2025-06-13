import { motion } from "framer-motion";

export default function PageTransition({ children, ...props }) {
  return (
    <motion.div
    style={{ 
      flex: "1", 
      display: "flex",
    }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
