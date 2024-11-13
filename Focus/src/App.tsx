import { Route, Routes } from "react-router-dom";

import Pomodoro from "./pages/Pomodoro";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<div>Hello</div>} />
      <Route path="/pomodoro" element={<Pomodoro />} />
    </Routes>
  );
};

export default App;
