import { createMuiTheme, makeStyles } from "@material-ui/core/styles"
import purple from '@material-ui/core/colors/purple'
import { Button, withWidth } from '@material-ui/core'
import { orange } from "@material-ui/core/colors";


const theme = createMuiTheme({
    palette: {
        primary:{
            main:'#82a3a1'
        },
        secondary: {
            main: '#011936'
        }
    },
    typography: {
        h6: {
            wordWrap:'break-word',
        },
        h3: {
            fontFamily:'libre baskerville',
            color:'#011936'
        },
        body1: {
            padding:'15px'
        },
    },
    overrides: {
        MuiButton: {
            root: {
                marginTop:"10px"
            }
        },
        // // MuiSvgIcon: {
        // //     root:{
        // //         marginRight:"10px"
        // //     }
        // },
        MuiCard: {
            root:{
                maxWidth:'300px'
            }
        }
    }
});

export default theme;



