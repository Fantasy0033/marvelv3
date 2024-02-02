import { useState, useEffect } from 'react';
import { motion } from 'framer-motion/dist/framer-motion';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';

const RandomChar = () => {

    const [char, setChar] = useState({});

    const {loading, error, getCharacter, clearError} = useMarvelService();
    /* eslint-disable */
    useEffect(() => {
        updateChar();
        const timerID = setInterval(updateChar, 60000);

        return () => {
            clearInterval(timerID);
        }
    }, [])

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => { // берет рандомный айди, запускает onCharLoading для показа спиннера загрузки. Дальше запускает функцию запроса данных на сервер
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
        getCharacter(id)
        .then(onCharLoaded)
    }

        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ? <View char={char}/> : null;
        
        return (
            <div className="randomchar">
                {errorMessage}
                {spinner}
                {content}
                <motion.div className="randomchar__static"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ stiffness: 100}}>
                    <p className="randomchar__title">
                        Random character for today!<br/>
                        Do you want to get to know him better?
                    </p>
                    <p className="randomchar__title">
                        Or choose another one
                    </p>
                    <button onClick={updateChar} className="button button__main">
                        <div className="inner" >try it</div>
                    </button>
                    <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
                </motion.div>
            </div>
        )
}

const View = ({char}) => {

    const {name, description, thumbnail, homepage, wiki} = char;
    let imgStyle = {'objectFit' : 'cover'};
    if(thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg") {
        imgStyle = {'objectFit' : 'contain'};
    }
    return (
        <motion.div className="randomchar__block"
        initial={{ x: -50 }}
        animate={{ x: 0 }}>
        <motion.img src={thumbnail} alt="Random character" className="randomchar__img" style={imgStyle} initial={{ opacity: 0 }} animate={{ opacity: 1 }}/>
        <div className="randomchar__info">
            <p className="randomchar__name">{name}</p>
            <p className="randomchar__descr">
                {description}
            </p>
            <div className="randomchar__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </motion.div>
    )
}

export default RandomChar;