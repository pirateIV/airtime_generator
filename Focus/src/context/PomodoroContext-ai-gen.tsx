import React, {
  createContext,
  useContext,
  useReducer,
  useCallback,
} from "react";

// Types
type TimerMode = "work" | "shortBreak" | "longBreak";

interface TimerSettings {
  workDuration: number; // in minutes
  shortBreakDuration: number;
  longBreakDuration: number;
  longBreakInterval: number; // sessions before long break
  autoStartBreaks: boolean;
  autoStartWork: boolean;
}

interface TimerStatistics {
  completedSessions: number;
  totalWorkTime: number; // in minutes
  totalBreakTime: number; // in minutes
}

interface TimerState {
  mode: TimerMode;
  timeLeft: number; // in seconds
  isRunning: boolean;
  sessionsUntilLongBreak: number;
  settings: TimerSettings;
  statistics: TimerStatistics;
}

// Actions
type TimerAction =
  | { type: "START_TIMER" }
  | { type: "PAUSE_TIMER" }
  | { type: "RESET_TIMER" }
  | { type: "SKIP_TIMER" }
  | { type: "UPDATE_SETTINGS"; payload: Partial<TimerSettings> }
  | { type: "COMPLETE_SESSION" }
  | { type: "TICK" };

// Context type
interface PomodoroContextType {
  state: TimerState;
  startTimer: () => void;
  pauseTimer: () => void;
  resetTimer: () => void;
  skipTimer: () => void;
  updateSettings: (settings: Partial<TimerSettings>) => void;
}

// Default values
const DEFAULT_SETTINGS: TimerSettings = {
  workDuration: 25,
  shortBreakDuration: 5,
  longBreakDuration: 15,
  longBreakInterval: 4,
  autoStartBreaks: true,
  autoStartWork: true,
};

const initialState: TimerState = {
  mode: "work",
  timeLeft: DEFAULT_SETTINGS.workDuration * 60,
  isRunning: false,
  sessionsUntilLongBreak: DEFAULT_SETTINGS.longBreakInterval,
  settings: DEFAULT_SETTINGS,
  statistics: {
    completedSessions: 0,
    totalWorkTime: 0,
    totalBreakTime: 0,
  },
};

// Create context
const PomodoroContext = createContext<PomodoroContextType | undefined>(
  undefined
);

// Reducer
function pomodoroReducer(state: TimerState, action: TimerAction): TimerState {
  switch (action.type) {
    case "START_TIMER":
      return { ...state, isRunning: true };

    case "PAUSE_TIMER":
      return { ...state, isRunning: false };

    case "RESET_TIMER":
      return {
        ...state,
        timeLeft:
          state.mode === "work"
            ? state.settings.workDuration * 60
            : state.mode === "shortBreak"
            ? state.settings.shortBreakDuration * 60
            : state.settings.longBreakDuration * 60,
        isRunning: false,
      };

    case "SKIP_TIMER":
      const nextMode = getNextMode(state);
      return {
        ...state,
        mode: nextMode,
        timeLeft: getTimeForMode(nextMode, state.settings),
        isRunning: getAutoStartForMode(nextMode, state.settings),
        sessionsUntilLongBreak:
          nextMode === "work"
            ? state.sessionsUntilLongBreak
            : state.sessionsUntilLongBreak - 1,
      };

    case "UPDATE_SETTINGS":
      const newSettings = { ...state.settings, ...action.payload };
      return {
        ...state,
        settings: newSettings,
        timeLeft: getTimeForMode(state.mode, newSettings),
      };

    case "COMPLETE_SESSION":
      const completedMode = state.mode;
      const nextModeAfterComplete = getNextMode(state);
      return {
        ...state,
        mode: nextModeAfterComplete,
        timeLeft: getTimeForMode(nextModeAfterComplete, state.settings),
        isRunning: getAutoStartForMode(nextModeAfterComplete, state.settings),
        sessionsUntilLongBreak:
          completedMode === "work"
            ? state.sessionsUntilLongBreak - 1
            : state.sessionsUntilLongBreak,
        statistics: {
          ...state.statistics,
          completedSessions:
            completedMode === "work"
              ? state.statistics.completedSessions + 1
              : state.statistics.completedSessions,
          totalWorkTime:
            completedMode === "work"
              ? state.statistics.totalWorkTime + state.settings.workDuration
              : state.statistics.totalWorkTime,
          totalBreakTime:
            completedMode !== "work"
              ? state.statistics.totalBreakTime +
                (completedMode === "shortBreak"
                  ? state.settings.shortBreakDuration
                  : state.settings.longBreakDuration)
              : state.statistics.totalBreakTime,
        },
      };

    case "TICK":
      if (state.timeLeft <= 0) {
        return pomodoroReducer(state, { type: "COMPLETE_SESSION" });
      }
      return {
        ...state,
        timeLeft: state.timeLeft - 1,
      };

    default:
      return state;
  }
}

// Helper functions
function getNextMode(state: TimerState): TimerMode {
  if (state.mode === "work") {
    return state.sessionsUntilLongBreak === 1 ? "longBreak" : "shortBreak";
  }
  return "work";
}

function getTimeForMode(mode: TimerMode, settings: TimerSettings): number {
  switch (mode) {
    case "work":
      return settings.workDuration * 60;
    case "shortBreak":
      return settings.shortBreakDuration * 60;
    case "longBreak":
      return settings.longBreakDuration * 60;
  }
}

function getAutoStartForMode(
  mode: TimerMode,
  settings: TimerSettings
): boolean {
  return mode === "work" ? settings.autoStartWork : settings.autoStartBreaks;
}

// Provider component
export const PomodoroProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(pomodoroReducer, initialState);

  const startTimer = useCallback(() => {
    dispatch({ type: "START_TIMER" });
  }, []);

  const pauseTimer = useCallback(() => {
    dispatch({ type: "PAUSE_TIMER" });
  }, []);

  const resetTimer = useCallback(() => {
    dispatch({ type: "RESET_TIMER" });
  }, []);

  const skipTimer = useCallback(() => {
    dispatch({ type: "SKIP_TIMER" });
  }, []);

  const updateSettings = useCallback((settings: Partial<TimerSettings>) => {
    dispatch({ type: "UPDATE_SETTINGS", payload: settings });
  }, []);

  // Effect for timer tick
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (state.isRunning && state.timeLeft > 0) {
      interval = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [state.isRunning, state.timeLeft]);

  const value = {
    state,
    startTimer,
    pauseTimer,
    resetTimer,
    skipTimer,
    updateSettings,
  };

  return (
    <PomodoroContext.Provider value={value}>
      {children}
    </PomodoroContext.Provider>
  );
};

// Custom hook to use the Pomodoro context
export const usePomodoroTimer = () => {
  const context = useContext(PomodoroContext);
  if (context === undefined) {
    throw new Error("usePomodoroTimer must be used within a PomodoroProvider");
  }
  return context;
};
