import { createMuiTheme, makeStyles } from "@material-ui/core/styles"
import purple from '@material-ui/core/colors/purple'
import { Button, withWidth } from '@material-ui/core'
import { orange } from "@material-ui/core/colors";


const theme = createMuiTheme({
    palette: {
        primary:{
            main:'#fcf5c7'
        },
        secondary: {
            main: '#de1616'
        }
    },
    typography: {
        h6: {
            wordWrap:'break-word',
        },
        h4: {
            fontFamily:'kalam',
            color:'#011936'
        },
        body1: {
            padding:'15px'
        },
    },
    overrides: {
        MuiButton: {
            root: {
                marginTop:"10px",
                padding:'2px 7px',
            }
        },
    }
});

export default theme;



