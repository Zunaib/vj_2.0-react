import React from 'react';
import { useSnackbar } from 'notistack';
const Snackbar = (props) => {

    const { enqueueSnackbar } = useSnackbar();

    const snack = (msg, type) => {
        enqueueSnackbar(msg, {
            preventDuplicate: true,
            autoHideDuration: 3000,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            },
            variant: type,
        });
        props.refresh();
    }
    return (
        <div>
            {snack(props.message, props.snackType)}
        </div>


    )
}


export default Snackbar;





// let errorsnack = null;
// if (this.props.error) {
//     console.log('in err snack');
//     errorsnack = (
//         // this.onError(this.props.error)
//         () => this.onError(this.props.error)
//     );
// }