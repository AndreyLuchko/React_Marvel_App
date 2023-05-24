import { Helmet, HelmetProvider } from 'react-helmet-async';

import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";

const ComicsPage = () => {
    return (

        <HelmetProvider>
            <Helmet>
                <meta
                    name="description"
                    content="List of comics"
                />
                <title>Comics Page</title>
            </Helmet>
            <AppBanner />
            <ErrorBoundary>
                <ComicsList />
            </ErrorBoundary>
        </HelmetProvider>

    )
}

export default ComicsPage;