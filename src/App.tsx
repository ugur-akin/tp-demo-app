import React, { useEffect, useMemo, useState } from "react";
import { searchPlaceByLatLng } from "./fsqClient";
import { Box, Button, Drawer, Typography } from "@mui/material";
import { Map } from "./Map";
import { Place } from "./types";
import { HQ_LAT, HQ_LNG } from "./constants";
import { PlaceCard } from "./PlaceCard";

function App() {
	const [places, setPlaces] = useState<Place[]>([]);
	const [activePlace, setActivePlace] = useState<Place | null>(null);

	const hqLatLng: google.maps.LatLngLiteral = useMemo(
		() => ({ lat: HQ_LAT, lng: HQ_LNG }),
		[]
	);
	const handleMarkerClick = (p: Place) => {
		setActivePlace(p);
	};
	const showPlaceDetails = !!activePlace;
	const closePlaceDetails = () => setActivePlace(null);

	useEffect(() => {
		searchPlaceByLatLng(HQ_LAT, HQ_LNG).then((data) => {
			setPlaces(data.results);
		});
	}, []);

	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "start",
				alignItems: "center",
				width: "100vw",
				height: "100vh",
			}}
		>
			<Map
				center={hqLatLng}
				places={places}
				handleMarkerClick={handleMarkerClick}
			/>
			{showPlaceDetails && (
				<Box
					component={PlaceCard}
					sx={{ width: "33%", height: "100%" }}
					place={activePlace}
					handleClose={closePlaceDetails}
				></Box>
			)}
		</Box>
	);
}

export default App;
