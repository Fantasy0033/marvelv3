import './skeleton.scss';
import { motion } from 'framer-motion/dist/framer-motion';

const Skeleton = () => {
    return (
        <motion.div                 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ stiffness: 100}}>
            <p className="char__select">Please select a character to see information</p>
            <div className="skeleton">
                <div className="pulse skeleton__header">
                    <div className="pulse skeleton__circle"></div>
                    <div className="pulse skeleton__mini"></div>
                </div>
                <div className="pulse skeleton__block"></div>
                <div className="pulse skeleton__block"></div>
                <div className="pulse skeleton__block"></div>
            </div>
        </motion.div>
    )
}

export default Skeleton;