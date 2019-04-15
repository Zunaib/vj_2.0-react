import React from 'react';
import { useSnackbar } from 'notistack';
const Snackbar = (props) => {

    const { enqueueSnackbar } = useSnackbar();

    const snack = (msg, type) => {
        enqueueSnackbar(msg, {
            preventDuplicate: true,
            anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'right',
            },
            variant: type,
        });
        props.errRefresh();
    }



    // const onSuccess = (msg) => {
    //     enqueueSnackbar(msg, {
    //         anchorOrigin: {
    //             vertical: 'top',
    //             horizontal: 'right',
    //         },
    //         variant: 'success',
    //     });
    // }

    // let errorSnack = null;
    // if (props.snackType === 'Error') {
    //     errorSnack = onError(props.message);
    // } else if (props.snackType === 'Success') {
    //     errorSnack = onSuccess(props.message);
    // }
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