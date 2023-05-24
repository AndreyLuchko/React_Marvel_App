import { Helmet, HelmetProvider } from 'react-helmet-async';

import './singleCharPage.scss';

const SingleCharPage = ({ data }) => {

    const { name, description, thumbnail } = data;

    return (
        <HelmetProvider>
            <div className="single-char">
                <Helmet>
                    <meta
                        name="description"
                        content={`Information about ${name}`}
                    />
                    <title>{name}</title>
                </Helmet>
                <img src={thumbnail} alt={name} className="single-char__img" />
                <div className="single-char__info">
                    <h2 className="single-char__name">{name}</h2>
                    <p className="single-char__descr">{description}</p>
                </div>
            </div>
        </HelmetProvider>

    )
}

export default SingleCharPage;