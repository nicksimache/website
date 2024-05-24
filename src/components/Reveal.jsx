import React, {Children, useEffect, useRef} from "react";
import {motion, useInView, useAnimation} from "framer-motion";

const Reveal = ({children, delay}) => {
    return (
        <div
            style = {{position: 'relative', width: 'fit-content', overflow: 'hidden'}}
        >
            <motion.div
                variants={{
                    hidden:{ opacity:0, y:75 },
                    visible: { opacity:1, y:0 }
                }}
                initial="hidden"
                animate="visible"
                transition={{ duration: 0.4, delay: delay || 0 }}
            >
                {children}
            </motion.div>

        </div>
    )
}

export default Reveal;