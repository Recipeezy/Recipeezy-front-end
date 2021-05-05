import { createMuiTheme } from "@material-ui/core/styles"



const theme = createMuiTheme({
    palette: {
        primary:{
            // main:'#187B8b'
            main: '#004e64'
        },
        secondary: {
            main: '#ffd000'
        }
    },
    typography: {
        h6: {
            fontFamily:'kalam',
            wordWrap:'break-word',
        },
        h4: {
            fontFamily:'overlock',
            color:'#011936'
        },
        h5: {
            fontFamily:'kalam',
        },
        body1: {
            padding:'12px',
            lineHeight:'1.75',
            fontFamily: 'Roboto',
        },
        body2: {
            color: '#000000',
            fontFamily: 'Roboto'
        },
    },
    overrides: {
        MuiButton: {
            root: {
                marginTop:"10px",
                padding:'2px 7px',
                fontFamily: 'Roboto'
            }
        },
    }
});

export default theme;



