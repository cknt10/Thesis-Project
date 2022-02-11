import React from 'react';
import Root from './Root';
import Search from './components/Search';
import Container from './utils/grid/Container';
import './index.css';

// const App: React.FC = () => {
const App = () => {
    return (
        <React.StrictMode>
            <Root>
                <Container>
                    <Search />
                </Container>
            </Root>
        </React.StrictMode>
    );
};

export default App;