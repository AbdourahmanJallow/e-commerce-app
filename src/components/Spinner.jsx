import loadingIcon from '../assets/loading-gif.gif';

function Spinner() {
    return (
        <div className='fixed top-0 bottom-0 right-0 left-0 flex justify-center items-center bg-black/50'>
            <img src={loadingIcon} alt='loading icon' width='100'/>
        </div>
    )
}

export default Spinner