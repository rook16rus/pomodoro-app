import React from 'react';

import PomodoroDisplay from "../PomodoroDisplay/PomodoroDisplay";
import PomodoroControls from "../PomodoroControls/PomodoroControls";
import PomodoroCycles from "../PomodoroCycles/PomodoroCycles";

import './App.scss';

function App() {
    return (
        <div className="pomodoro">
            <PomodoroDisplay />
            <PomodoroControls />
            <PomodoroCycles />
            <span className="pomodoro__status">
                Focus Time
            </span>
        </div>
    );
}

export default App;
