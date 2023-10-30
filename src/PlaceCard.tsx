import { ExpandMore } from "@mui/icons-material";
import {
	Card,
	CardHeader,
	Avatar,
	IconButton,
	CardMedia,
	CardContent,
	Typography,
	CardActions,
} from "@mui/material";
import { red } from "@mui/material/colors";
import React from "react";
import { Place } from "./types";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import CloseIcon from "@mui/icons-material/Close";

export interface PlaceCardProps {
	place: Place;
	handleClose: () => void;
}

export const PlaceCard: React.FC<PlaceCardProps> = ({ place, handleClose }) => {
	return (
		<Card sx={{ maxWidth: 345 }} elevation={0}>
			<CardHeader
				avatar={<LocationOnIcon sx={{ color: red[500], fontSize: 40 }} />}
				title={place.name}
				subheader={place.location.formatted_address}
				action={
					<IconButton onClick={handleClose}>
						{" "}
						<CloseIcon />
					</IconButton>
				}
			/>
			<CardMedia
				component="img"
				height="194"
				image="https://placehold.co/600x400"
				alt={`placeholder img for place ${place.name}`}
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					Display details about the location...
				</Typography>
			</CardContent>
			<CardActions disableSpacing sx={{ justifyContent: "end" }}>
				<IconButton
					component="a"
					href={`https://foursquare.com/venue/${place.fsq_id}`}
					target="_blank"
				>
					<OpenInNewIcon />
				</IconButton>
			</CardActions>
		</Card>
	);
};
