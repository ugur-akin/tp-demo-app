export async function searchPlaceByLatLng(lat: number, lng: number) {
	try {
		const ll = `${lat},${lng}`;

		const searchParams = new URLSearchParams({
			ll,
		});
		const results = await fetch(
			`https://api.foursquare.com/v3/places/search?${searchParams}`,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					Authorization: process.env.REACT_APP_FSQ_API_KEY!,
				},
			}
		);
		const data = await results.json();
		return data;
	} catch (err) {
		console.error(err);
	}
}
