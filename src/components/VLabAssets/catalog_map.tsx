import {useCallback, useContext, useEffect, useState,} from "react";
import {default as L} from 'leaflet';
import {GeoJsonObject} from 'geojson';
import {GeoJSON, MapContainer, TileLayer, useMapEvents,} from "react-leaflet";
import hash from 'object-hash';
import 'leaflet/dist/leaflet.css';
import {RuntimeConfigContext} from "@/context/runtime-config";
import {useSession} from "next-auth/react";
import {getRefreshedAccessToken} from "@/lib/auth";

function DataProducts({
  map,
  slug,
}: {
  map: L.Map;
  slug?: string | string[];
}) {

  const runtimeConfig = useContext(RuntimeConfigContext);

  const {data: session} = useSession()
  const [data, setData] = useState<GeoJsonObject>({'type': 'Feature'})
  const [geoJSON, setGeoJSON] = useState<L.GeoJSON | null>(null)

  function keyFunction(obj: object) {
    try {
      return hash(obj)
    } catch (e) {
      console.log('Error encountered in keyFunction', e)
      return ''
    }
  }

  const getFeatures = useCallback(async () => {
  try {
    const accessToken = await getRefreshedAccessToken(runtimeConfig.basePath);
    const res = await fetch(
      `${runtimeConfig.naavreCatalogueServiceUrl}/geo-data-products/?format=json&in_bbox=${map.getBounds().toBBoxString()}&virtual-lab=${slug}`,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken || session?.accessToken}`,
        },
      }
    )
    if (res.status !== 200) {
      console.log(res);
      return
    }
    const dat = await res.json();
    setData(dat.results);
  } catch (error) {
    console.log(error);
  }
  }, [map, runtimeConfig, session?.accessToken, slug])


  const onEachLayer = useCallback((layer: L.Layer) => {
    function highlightFeature(e: L.LeafletMouseEvent) {
      e.target.setStyle({
        weight: 5,
        color: '#669',
        fillOpacity: 0.7,
      });
    }

    function resetHighlight(e: L.LeafletMouseEvent) {
      if (geoJSON) {
        geoJSON.resetStyle(e.target);
      }
    }

    layer.on({
      mouseover: highlightFeature,
      mouseout: resetHighlight,
    });
    // @ts-expect-error: geoJSON layers have a feature attribute
    layer.bindPopup(layer.feature.properties.title);
  }, [geoJSON])

  useEffect(() => {
    if (geoJSON) {
      geoJSON.eachLayer(onEachLayer)
    }
  }, [geoJSON, onEachLayer])

  useEffect(() => {
    getFeatures().then()
  }, [getFeatures])

  useMapEvents({
    moveend: () => {getFeatures().then()},
  });

  return (
    <GeoJSON
      key={keyFunction(data)}
      data={data}
      ref={setGeoJSON}
    >
    </GeoJSON>
  )
}

export default function CatalogMap({vlab_slug}: { vlab_slug?: string | string[] }) {
  const [map, setMap] = useState<L.Map | null>(null)

  return (
    <MapContainer
      id="map"
      center={[50, 10]} zoom={3.5}
      style={{height: "100%", width: "100%"}}
      ref={setMap}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {map ? <DataProducts map={map} slug={vlab_slug}/> : null}
    </MapContainer>
  )
}
