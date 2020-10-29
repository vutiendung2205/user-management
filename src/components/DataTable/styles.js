
const styles = (theme) =>{
    return{
        root : {
            margin : "20px",
            backgroundColor: "#ececec"
        },
        tableRow : {
            cursor : 'pointer',
            color : '#333'
        },
        avatarDialog:{
            width : '100px',
            height: '100px',
            margin: 'auto'
        },
        fullnameDialog: {
            textAlign: 'center'
        },
        headerDialog : {
            backgroundColor: '#192d3e',
            color: theme.typography.colorWhite
        },
        formControlLabel :{
            margin: '5px 0px'
        },
        textField : {
            width : '20rem',
            margin: '0px 0px 0px 5px'
        },
        dialogActions :{
            display : 'flex',
            justifyContent : 'space-between'
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
          },
        checkbox:{
            zIndex : 1
        },
        title: {
            flex: '1 1 100%',
            textAlign: 'left'
        },
        root1: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(1),
        },
        highlight: {
            backgroundColor: "#fae0e8"
        },
        nomal: {
            backgroundColor: "#4dabf5"
        },
        tableHead: {
            backgroundColor: "#f6f7d4"
        }
    }
}
export default styles;