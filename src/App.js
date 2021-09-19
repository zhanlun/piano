import { createTheme, MuiThemeProvider } from '@material-ui/core';
import { orange } from '@material-ui/core/colors';
import Alert from '@material-ui/lab/Alert';
import Piano from "./components/Piano";

const theme = createTheme({
  palette: {
    primary: {
      main: '#212121'
    },
    secondary: orange
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
  }
})
function App() {
  return (
    <MuiThemeProvider theme={theme}>

    <div>
        <div className="alert-info-mobile">
          <Alert variant="filled" severity="info">Please use landscape mode (rotate screen) to enjoy this app better, if you are on smaller screen.</Alert>
        </div>
      <Piano />
      </div>
    </MuiThemeProvider>

  );
}

export default App;
