import { useState, useEffect } from "react";
import "./PointsCount.css";

function PointsCount() {
  const [points, setPoints] = useState(0);

  function getPoints() {
    /*
      fetch("http://localhost:58716/api/points")
      .then((res) => res.json())
      .then((data) => setPoints(data))
      .catch((err) => console.error("Fehler beim Laden der Punkte:", err));
    */
    setPoints(42); // Platzhalterwert, da die API noch nicht implementiert
  }

  useEffect(() => {
    getPoints();
  }, []);

  return (
    <div className="pointsCount">
      <span className="pointsLabel"></span>
      <span className="pointsValue">{points}</span>
    </div>
  );
}

export default PointsCount;
