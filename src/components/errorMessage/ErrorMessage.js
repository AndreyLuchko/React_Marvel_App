import img from './error.gif'

const ErrorMessage = () => {
    return (
        // <img src={process.env.PUBLIC_URL + '/error.gif'} /> // if error.gif in 'public' folder

        <img style={{margin: '0 auto', display: 'block', width: "250px", height: "250px", objectFit: "contain"}} src={img} alt='Error'/>
    )
}

export default ErrorMessage;