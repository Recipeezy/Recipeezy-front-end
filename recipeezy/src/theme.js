import { createMuiTheme } from "@material-ui/core/styles"



const theme = createMuiTheme({
    palette: {
        primary:{
            main:'#187B8B'
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
            fontFamily:'kalam',
            color:'#011936'
        },
        h3: {
            fontFamily:'kalam',
            fontWeight: 'bold'
        },
        body1: {
            padding:'12px',
            lineHeight:'1.75'
        },
        body2: {
            color: '#000000'
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



