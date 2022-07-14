import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles(theme => ({
    arrow: {
        left: "0px !important",
        "&:before": {
            border: "1px solid #E6E8ED",


        },
        color: theme.palette.common.white
    },
    tooltip: {
        backgroundColor: theme.palette.common.white,
        border: "1px solid #E6E8ED",
        color: "#4A4A4A",
        maxWidth: '100%',
        margin: '8px',



    }
}));

export default useStyles