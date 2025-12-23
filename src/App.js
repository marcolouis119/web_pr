import React from 'react';
import Header from './components/Header/Header';
import Hero from './components/Hero/Hero';
import Features from './components/Features/Features';
import Map from './components/Map/Map';
import Emotions from './components/Emotions/Emotions';
import styles from './App.module.css';

function App() {
    return (
        <div className={styles.app}>
            <Header />
            <main>
                <Hero />
                <Features />
                <Map />
                <Emotions />
            </main>
        </div>
    );
}

export default App;
