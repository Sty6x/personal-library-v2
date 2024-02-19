import { motion } from "framer-motion";
import { ReactNode } from "react";
const BookItemContents = ({ children }: { children: ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, display: "none" }}
      animate={{
        opacity: 1,
        scale: 1,
        display: "flex",
        transition: { delay: 0.2 },
      }}
      exit={{
        opacity: 0,
        scale: 0,
        transition: { duration: 0.2 },
      }}
      className="flex flex-col max-w-[70%] w-[max-content] drop-shadow-text-shadow"
    >
      {children}
    </motion.div>
  );
};
export default BookItemContents;
