import { useParams } from 'react-router-dom';
import './SingleCharacterPage.scss';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion/dist/framer-motion';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';


const SingleCharacterPage = () => {
    const {id} = useParams();
    const [char, setChar] = useState(null);
    const {loading, error, clearError, getCharacter} = useMarvelService();

    /* eslint-disable */
    useEffect(() => {   
        updateChar();
    },[id])

    const updateChar = () => {
        clearError();

        getCharacter(id)
        .then(onCharLoaded)
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <>
        {errorMessage}
        {spinner}
        {content}
        </>
    )
}

const View = ({char}) => {
    const {thumbnail, name, description} = char;

    return (
    <motion.div className="single-comic"
    initial={{ y: -50, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ stiffness: 100}}>
        <img src={thumbnail} alt={name} className="single-comic__char-img"/>
        <div className="single-comic__info">
            <h2 className="single-comic__name">{name}</h2>
            <p className="single-comic__descr">{description}</p>
        </div>
    </motion.div>
    )
}

export default SingleCharacterPage;