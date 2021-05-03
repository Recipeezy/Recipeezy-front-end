import { createMuiTheme } from "@material-ui/core/styles"

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
            padding:'12px',
            lineHeight:'1.75'
        },
        body2: {
            color: '#de1616'
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



