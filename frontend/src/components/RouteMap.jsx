import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Polyline, Circle, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";

const CORRIDOR_ROUTES = {
  silk_board_orr: {
    name: "Silk Board → Outer Ring Road",
    coords: [
      [12.9172, 77.6229],
      [12.9215, 77.6332],
      [12.9245, 77.6412],
      [12.9278, 77.6558],
      [12.9310, 77.6701],
      [12.9335, 77.6835],
      [12.9350, 77.6963],
    ],
    origin: [12.9172, 77.6229],
    dest: [12.9350, 77.6963],
  },
  whitefield_stretch: {
    name: "Whitefield → Marathahalli",
    coords: [
      [12.9698, 77.7500],
      [12.9648, 77.7400],
      [12.9598, 77.7300],
      [12.9548, 77.7200],
      [12.9498, 77.7100],
    ],
    origin: [12.9698, 77.7500],
    dest: [12.9498, 77.7100],
  },
  hebbal: {
    name: "Hebbal",
    coords: [
      [13.0358, 77.5970],
      [13.0308, 77.5920],
      [13.0258, 77.5870],
      [13.0208, 77.5820],
    ],
    origin: [13.0358, 77.5970],
    dest: [13.0208, 77.5820],
  },
  electronic_city: {
    name: "Electronic City → Hosur Road",
    coords: [
      [12.8456, 77.6603],
      [12.8506, 77.6653],
      [12.8556, 77.6703],
      [12.8606, 77.6753],
      [12.8656, 77.6803],
    ],
    origin: [12.8456, 77.6603],
    dest: [12.8656, 77.6803],
  },
};

function getSegmentColor(segmentIndex, congestionLevel, bottleneckIndices) {
  if (bottleneckIndices && bottleneckIndices.includes(segmentIndex)) {
    if (congestionLevel === "HIGH") return "#ef4444";
    if (congestionLevel === "MEDIUM") return "#f59e0b";
    return "#f59e0b";
  }
  return "#22c55e";
}

function FitBoundsToRoute({ coords }) {
  const map = useMap();
  useEffect(() => {
    if (coords.length > 0) {
      const bounds = L.latLngBounds(coords.map((c) => [c[1], c[0]]));
      map.fitBounds(bounds, { padding: [40, 40] });
    }
  }, [coords, map]);
  return null;
}

function ScrollActivator() {
  const map = useMap();
  const activated = useRef(false);

  useEffect(() => {
    map.scrollWheelZoom.disable();

    const enable = () => {
      if (!activated.current) {
        activated.current = true;
        map.scrollWheelZoom.enable();
      }
    };

    map.on("click", enable);
    map.on("focus", enable);

    return () => {
      map.off("click", enable);
      map.off("focus", enable);
    };
  }, [map]);

  return null;
}

export default function RouteMap({ corridor, congestion, routeGeometry, bottleneckIndices }) {
  const mapRef = useRef(null);
  const congestionLevel = congestion?.toUpperCase() || "HIGH";
  const indices = bottleneckIndices || [];

  const useDynamicRoute = routeGeometry?.coordinates?.length > 1;
  const route = useDynamicRoute
    ? {
        name: corridor ? CORRIDOR_ROUTES[corridor]?.name || "Route" : "Route",
        coords: routeGeometry.coordinates.map((c) => [c[1], c[0]]),
        origin: [routeGeometry.coordinates[0][1], routeGeometry.coordinates[0][0]],
        dest: [routeGeometry.coordinates[routeGeometry.coordinates.length - 1][1], routeGeometry.coordinates[routeGeometry.coordinates.length - 1][0]],
      }
    : CORRIDOR_ROUTES[corridor];

  if (!route) return null;

  const segments = [];
  for (let i = 0; i < route.coords.length - 1; i++) {
    segments.push({
      from: route.coords[i],
      to: route.coords[i + 1],
      color: getSegmentColor(i, congestionLevel, indices),
    });
  }

  const midIdx = Math.floor(route.coords.length / 2);

  return (
    <div className="mt-3 rounded-xl overflow-hidden border border-neutral-800/40">
      <MapContainer
        center={[12.93, 77.65]}
        zoom={12}
        zoomSnap={0.5}
        zoomDelta={0.5}
        scrollWheelZoom={true}
        dragging={true}
        zoomControl={false}
        className="w-full h-48 sm:h-64 z-0"
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />

        <FitBoundsToRoute coords={route.coords} />
        <ScrollActivator />

        {segments.map((seg, i) => (
          <Polyline
            key={i}
            positions={[seg.from, seg.to]}
            pathOptions={{
              color: seg.color,
              weight: 5,
              opacity: 0.9,
              className: "animate-draw-line",
            }}
          />
        ))}

        <Circle
          center={route.origin}
          pathOptions={{
            color: "#f59e0b",
            fillColor: "#f59e0b",
            fillOpacity: 1,
            weight: 2,
            radius: 80,
          }}
        >
          <Tooltip permanent direction="right" offset={[8, 0]} className="bg-neutral-900 text-neutral-200 border-neutral-700 text-xs font-medium">
            Origin
          </Tooltip>
        </Circle>

        <Circle
          center={route.dest}
          pathOptions={{
            color: "#06b6d4",
            fillColor: "#06b6d4",
            fillOpacity: 0.2,
            weight: 2,
            radius: 100,
          }}
        >
          <Tooltip permanent direction="right" offset={[8, 0]} className="bg-neutral-900 text-neutral-200 border-neutral-700 text-xs font-medium">
            Destination
          </Tooltip>
        </Circle>

        {indices.length > 0 && (
          <Circle
            center={route.coords[midIdx]}
            pathOptions={{
              color: "#ef4444",
              fillColor: "#ef4444",
              fillOpacity: 0.08,
              weight: 1,
              className: "animate-glow-pulse",
              radius: 250,
            }}
          />
        )}
      </MapContainer>
      <div className="px-3 py-1.5 bg-neutral-900/80 border-t border-neutral-800/30 flex items-center justify-between text-[10px]">
        <span className="text-neutral-500 font-medium">{route.name}</span>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-neutral-500">
            <span className="w-2 h-0.5 rounded bg-amber-500" />
            Origin
          </span>
          <span className="flex items-center gap-1 text-neutral-500">
            <span className="w-2 h-0.5 rounded bg-cyan-500" />
            Dest
          </span>
          <span className="flex items-center gap-1 text-neutral-500">
            <span className="w-2 h-0.5 rounded bg-green-500" />
            Clear
          </span>
          <span className="flex items-center gap-1 text-neutral-500">
            <span className="w-2 h-0.5 rounded bg-red-500" />
            Bottleneck
          </span>
        </div>
      </div>
    </div>
  );
}
