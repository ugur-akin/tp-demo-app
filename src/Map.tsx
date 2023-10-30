import { Box } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { Place } from "./types";
import { Status, Wrapper, WrapperProps } from "@googlemaps/react-wrapper";
import { DEFAULT_ZOOM } from "./constants";
import { getCharacterLabel } from "./utils";

interface MapProps {
	center: google.maps.LatLngLiteral;
	places: Place[];
	handleMarkerClick: (p: Place) => void;
}

const InternalMap: React.FC<MapProps> = ({
	center,
	places,
	handleMarkerClick,
}) => {
	const ref = useRef<HTMLDivElement | null>(null);
	const [mapHandle, setMapHandle] = useState<google.maps.Map | undefined>();

	useEffect(() => {
		if (ref.current) {
			const map = new google.maps.Map(ref.current as HTMLElement, {
				center,
				zoom: DEFAULT_ZOOM,
			});

			new google.maps.Marker({
				position: center,
				label: "HQ",
				map,
			});

			setMapHandle(map);
		}
	}, [ref, center]);

	useEffect(() => {
		if (mapHandle && places.length > 0) {
			places.map((place, i) => {
				const geocode = place.geocodes.main;
				const latLng = { lat: geocode.latitude, lng: geocode.longitude };

				const marker = new google.maps.Marker({
					position: latLng,
					map: mapHandle,
					label: getCharacterLabel(i),
				});

				const listener = () => handleMarkerClick(place);

				marker.addListener("click", listener);

				return marker;
			});
		}
	}, [mapHandle, places, handleMarkerClick]);

	return <Box ref={ref} id="map" sx={{ flexGrow: 1, height: "100%" }} />;
};

const RRMap: React.FC<MapProps> = (props) => {
	const render: WrapperProps["render"] = (status) => {
		switch (status) {
			case Status.SUCCESS:
				return <InternalMap {...props} />;
		}

		return <></>;
	};

	return (
		<Wrapper
			apiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY!}
			render={render}
		></Wrapper>
	);
};

const MemoedMap = React.memo(RRMap);
export const Map = MemoedMap;
