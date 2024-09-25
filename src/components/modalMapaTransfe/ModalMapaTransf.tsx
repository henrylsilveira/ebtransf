import * as React from 'react';
import Map, { GeolocateControl, Layer, Marker, NavigationControl } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { MdLocationPin } from 'react-icons/md';

async function getData(lat1: number, long1: number, lat2: number, long2: number) {
  const res = await fetch(`https://api.mapbox.com/directions/v5/mapbox/cycling/${lat1},${long1};${lat2},${long2}?geometries=geojson&access_token=pk.eyJ1IjoiaGVucnlsZWFvIiwiYSI6ImNtMWYzYnZtZzJsc3Mya216a3ZxbHJlMmsifQ.tWUPbbqY-s0RtICObKE75g`, { next: { revalidate: 3600 * 7 } })
  if (!res.ok) {
    throw new Error('Failed to fetch data')
  }
  return res.json()
}

export async function ModalMapaTransf({lat1, long1, lat2, long2}: {lat1: number, long1: number, lat2: number, long2: number}) {
  const data = await getData(lat1, long1, lat2, long2)
  console.log(data)

  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiaGVucnlsZWFvIiwiYSI6ImNtMWYzYnZtZzJsc3Mya216a3ZxbHJlMmsifQ.tWUPbbqY-s0RtICObKE75g"
      initialViewState={{
        longitude: long1,
        latitude: lat1,
      }}
      style={{ width: 600, height: 400 }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      <Marker longitude={long1} latitude={lat1} anchor="bottom" >
        <MdLocationPin className='text-green-600 w-10 h-10' />
      </Marker>
      <Marker longitude={long2} latitude={lat2} anchor="bottom" >
        <MdLocationPin className='text-red-600 w-10 h-10' />
      </Marker>
      <NavigationControl />
      <GeolocateControl />
    </Map>
  );
};
