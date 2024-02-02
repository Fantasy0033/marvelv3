import {Link, NavLink} from 'react-router-dom';
import { motion } from 'framer-motion/dist/framer-motion';
import './appHeader.scss';

const AppHeader = () => {

    return (
        <motion.header className="app__header" 
        initial={{ y: -100, opacity: 0, }}
        animate={{ y: 0, opacity: 1, }}
        transition={{ type: "spring", stiffness: 100 }}>
            <h1 className="app__title">
                <Link to="/"> {/* link to куда будет вести ссылка ( / - на главную страницу через роутер) */}
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li><NavLink 
                    end style={({ isActive }) => ({'color': isActive ? '#9F0013' : 'black'})} // прописываются стили при активности кнопки на определенном пути роутера 
                    to="/">Characters</NavLink></li>  {/* NavLink такой же как link только со стилями */}
                    /
                    <li><NavLink end style={({ isActive }) => ({'color': isActive ? '#9F0013' : 'black'})} to="/comics">Comics</NavLink></li>
                </ul>
            </nav>
        </motion.header>
    )
}

export default AppHeader;