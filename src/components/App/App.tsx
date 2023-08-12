import React from 'react';

import PomodoroDisplay from "../PomodoroDisplay/PomodoroDisplay";
import PomodoroControls from "../PomodoroControls/PomodoroControls";
import PomodoroCycles from "../PomodoroCycles/PomodoroCycles";

import styles from './App.module.scss';

function App() {
    return (
        <div className={styles.pomodoro}>
            <PomodoroDisplay />
            <PomodoroControls />
            <PomodoroCycles />
            <span className={styles.pomodoro__status}>
                Focus Time
            </span>
        </div>
    );
}

export default App;
