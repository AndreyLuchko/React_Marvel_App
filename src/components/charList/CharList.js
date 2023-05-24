import { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import PropTypes from 'prop-types';

import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './charList.scss';

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const { loading, error, getAllCharacters } = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);

        getAllCharacters(offset)
            .then(onCharListLoaded)
    }

    const onCharListLoaded = async (newCharList) => {
        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const itemsRefs = useRef([]);

    const focusOnItem = (id) => {
        itemsRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemsRefs.current[id].classList.add('char__item_selected');
        itemsRefs.current[id].focus();
    }

    function renderItems(arr) {

        const elements = arr.map((item, i) => {

            const { id, name, thumbnail } = item;
            const path = 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg'
            const style = thumbnail === path ? { objectFit: 'unset' } : null;

            return (
                <CSSTransition
                    key={id}
                    timeout={500}
                    classNames={'item'}
                >
                    <li
                        className="char__item"
                        // key={id}
                        tabIndex='0'
                        ref={el => itemsRefs.current[i] = el}
                        onClick={() => {
                            props.onCharSelected(id);
                            focusOnItem(i);
                        }}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                props.onCharSelected(id);
                                focusOnItem(i);
                            }
                        }}>
                        <img src={thumbnail} alt={name} style={style} />
                        <div className="char__name">{name}</div>
                    </li>
                </CSSTransition>
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {elements}
                </TransitionGroup>
            </ul>
        )
    }

    const items = renderItems(charList);

    const errorMessage = error ? <ErrorMessage /> : null;
    const spinner = loading && !newItemLoading ? <Spinner /> : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {items}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{ display: charEnded ? 'none' : 'block' }}
                onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired
};

export default CharList;