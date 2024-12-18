import { useDispatch } from "react-redux";
import "./App.css";
import Team from "./components/team/Team";
import { useEffect } from "react";
import { getAllTeam } from "./app/features/team/teamApiSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllTeam());
  }, [dispatch]);

  return (
    <div className="w-[1000px] mx-auto mt-[100px]">
      <Team />
    </div>
  );
}

export default App;
