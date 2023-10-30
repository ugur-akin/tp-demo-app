import { colors, createTheme } from "@mui/material";

export const theme = createTheme({
	palette: {
		primary: {
			main: colors.red[800],
		},
		secondary: {
			main: colors.pink.A100,
		},
	},
	components: {
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
				},
			},
		},
	},
});
