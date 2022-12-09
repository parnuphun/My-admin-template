import Swal from 'sweetalert2'
export class MsgAlert {
    successMsg(){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Your work has been saved',
            showConfirmButton: false,
            timer: 1500,
        })
    }

}

