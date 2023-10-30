export interface Place {
	fsq_id: string;
	name: string;
	location: { formatted_address: string };
	geocodes: {
		main: {
			latitude: number;
			longitude: number;
		};
	};
}
