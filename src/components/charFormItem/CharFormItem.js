import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
import { object, string } from 'yup';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charformitem.scss';

const CharFormItem = () => {
    const { getCharacterByName, clearError, loading, error } = useMarvelService();
    const [character, setCharacter] = useState(null);

    const updateChar = (name) => {
        clearError();

        getCharacterByName(name)
            .then(character => setCharacter(character))
    }
 
    const errorMessage = error ? <div className="char__search-critical-error"><ErrorMessage /></div> : null;

    const results = !character ? null : character.length > 0 ?

        <div className="char__form-item">
            <div className="char__form-item-name">There is! Visit {character[0].name} page?</div>
            <Link to={`/characters/${character[0].id}`} className="button button__secondary">
                <div
                    className="inner">
                        Page
                </div>
            </Link>
        </div> :
        <div className="char__form-item">
            The character was not found. Check the name and try again
        </div>

    return (
        <div className="char__form">
            <Formik
                initialValues={{
                    name: ''
                }}
                validationSchema={
                    object({
                        name: string().required('This field is required')
                    })}
                onSubmit={
                    ({ name }) => {
                        updateChar(name)
                    }}
            >
                <Form >
                    <label htmlFor='name' className="char__form-label">Or find a character by name:</label>
                    <Field
                        type="text"
                        name='name'
                        className="char__form-input"
                        placeholder="Enter name" />
                    <button
                        type="submit"
                        className="button button__main"
                        disabled={loading}>
                        <div className="inner">Find</div>
                    </button>

                    <FormikErrorMessage  name="name" component="div" className="char__form-error" />
                </Form>

            </Formik>
            {results}
            {errorMessage}
        </div>
    )
}

export default CharFormItem;