import { motion } from 'framer-motion/dist/framer-motion';
import './appBanner.scss';
import avengers from '../../resources/img/Avengers.png';
import avengersLogo from '../../resources/img/Avengers_logo.png';

const AppBanner = () => {
    return (
        <motion.div className="app__banner" 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200 }}>
            <img src={avengers} alt="Avengers" />
            <div className="app__banner-text">
                New comics every week!<br/>
                Stay tuned!
            </div>
            <img src={avengersLogo} alt="Avengers logo"/>
        </motion.div>
    )
}

export default AppBanner;