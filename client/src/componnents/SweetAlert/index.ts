import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const MySwal = withReactContent(Swal)

interface Props {
    title?: string
    text?: string
    click?: () => void   
}

export const handleSuccess = ( props: Props ) => {
    return MySwal.fire({
        title: props.title,
        text: props.text || '',
        icon: 'success',
        customClass: {
            confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
    }).then(props.click)
}

export const handleInfo = () => {
    return MySwal.fire({
        title: 'Info!',
        text: 'You clicked the button!',
        icon: 'info',
        customClass: {
            confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
    })
}

export const handleWarning = () => {
    return MySwal.fire({
        title: 'Warning!',
        text: ' You clicked the button!',
        icon: 'warning',
        customClass: {
            confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
    })
}

export const handleError = (props: Props) => {
    return MySwal.fire({
        title: props.title,
        text: props.text || '',
        icon: 'error',
        customClass: {
            confirmButton: 'btn btn-primary'
        },
        buttonsStyling: false
    })
}
 