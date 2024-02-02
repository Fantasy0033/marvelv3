import './comicsList.scss';
import { useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import { motion } from 'framer-motion/dist/framer-motion';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

const ComicsList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffSet] = useState(0);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllComics} = useMarvelService();

    /* eslint-disable */
    useEffect(() => {
        onRequest();
    }, [])

    const onRequest = (offset) => {
        getAllComics(offset)
        .then(onCharListLoaded)
    }

    const onCharListLoaded = (newCharList) => {
        let ended = false;
        if (newCharList.length < 8) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffSet(offset => offset + 8);
        setCharEnded(charEnded => ended);
    }

    const listVariants = {
        visible: i => ({
            opacity: 1,
            transition: {
                delay: i * 0.1,
            }
        }),
        hidden: { opacity: 0}
    };

    /* eslint-disable */
    function renderItems(arr) {
        const items = arr.map((item, i) => {

            return (
                <motion.li className="comics__item" key={i} 
                variants={listVariants}
                 initial='hidden'
                  animate='visible'
                   custom={i}>
                <Link to={`/comics/${item.id}`}>
                    <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                    <div className="comics__item-name">{item.name}</div>
                    <div className="comics__item-price">{item.price}</div>
                </Link>
            </motion.li>
            )
        });

        return (
            <ul className="comics__grid">
                {items}
            </ul>
        )
    }

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null


    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {items}
            <button className="button button__main button__long"
            disabled={newItemLoading}
            style={{ 'display': charEnded ? 'none' : 'block' }}
            onClick={() => onRequest(offset)}>
            <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;