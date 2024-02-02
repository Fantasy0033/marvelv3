import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { motion } from 'framer-motion/dist/framer-motion';
import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';
import useMarvelService from '../../services/MarvelService';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {loading, error, clearError, getCharacter} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])


    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }
        clearError();
        getCharacter(charId)
            .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char)
    }

        const skeleton = char || loading || error ? null : <Skeleton/>;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error || !char) ? <View char={char}/> : null;

        return (
            <div className="char__info">
                {skeleton}
                {errorMessage}
                {spinner}
                {content}
            </div>
        )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;
    console.log(char);

    let imgStyle = {'objectFit' : 'cover'};
    if(thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
        imgStyle = {'objectFit' : 'contain'};
    }

    return (
        <>
            <motion.div className="char__basics" 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 100}}>
                    <img src={thumbnail} alt={name} style={imgStyle}/>
                    <div>
                        <div className="char__info-name">{name}</div>
                        <div className="char__btns">
                            <a href={homepage} className="button button__main">
                                <div className="inner">homepage</div>
                            </a>
                            <a href={wiki} className="button button__secondary">
                                <div className="inner">Wiki</div>
                            </a>
                        </div>
                    </div>
                </motion.div>
                <div className="char__descr">
                    {description}
                </div>
                <div className="char__comics">Comics:</div>
                <ul className="char__comics-list">
                    {comics.length > 0 ? null : 'Нету данных о комиксах этого персонажа'}
                {
                   comics.map((item, i) => {
                        if (i > 9) return;
                        const comicId = item.resourceURI.match(/\/(\d+)$/)[1];
                        return (
                        <motion.li key={i} className="char__comics-item"
                        initial={{ x: -50 }}
                        animate={{ x: 0 }}>
                            <Link to={`comics/${comicId}`}>{item.name}</Link>
                        </motion.li>
                        )
                    })
                }

                </ul>
        </>
    )
}

export default CharInfo;