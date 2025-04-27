import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { scaleLinear } from "d3-scale";

const geoUrl = "/fr-en-contour-academies-2020.geojson";

const pression = {
  "Aix-Marseille": 75,
  "Amiens": 56,
  "Besançon": 44,
  "Bordeaux": 127,
  "Clermont-Ferrand": 75,
  "Corse": 67,
  "Créteil": 56,
  "Dijon": 50,
  "Grenoble": 56,
  "Lille": 105,
  "Limoges": 70,
  "Lyon": 44,
  "Montpellier": 262,
  "Nancy-Metz": 62,
  "Nantes": 65,
  "Nice": 211,
  "Normandie": 43,
  "Orléans-Tours": 65,
  "Paris": 333,
  "Poitiers": 100,
  "Reims": 45,
  "Rennes": 150,
  "Strasbourg": 131,
  "Toulouse": 90,
  "Versailles": 57
};

const colorScale = scaleLinear()
  .domain([0, 100, 300])
  .range(["#34d399", "#facc15", "#ef4444"]);

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-white flex flex-col">
      <header className="text-center p-4">
        <h1 className="text-4xl font-bold text-indigo-700">Carte de pression académique PERDIR 2025</h1>
        <p className="text-gray-600">Plus c'est rouge, plus c'est chaud ! 🔥</p>
      </header>

      <div className="flex-1">
        <ComposableMap projection="geoMercator" projectionConfig={{ center: [2.2137, 46.2276], scale: 2600 }} width={800} height={1000}>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const acadName = geo.properties.nom_academie || geo.properties.nom;
                const acadPressure = pression[acadName] || 0;
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={colorScale(acadPressure)}
                    stroke="#FFFFFF"
                    strokeWidth={0.5}
                    style={{
                      default: { outline: "none" },
                      hover: { fill: "#60a5fa", outline: "none" },
                      pressed: { outline: "none" }
                    }}
                    title={`${acadName} - ${acadPressure}% de pression`}
                  />
                );
              })
            }
          </Geographies>
        </ComposableMap>
      </div>

      <footer className="text-center p-4 text-gray-500 text-sm">
        Données basées sur les pressions observées en 2024.
      </footer>
    </div>
  );
}
