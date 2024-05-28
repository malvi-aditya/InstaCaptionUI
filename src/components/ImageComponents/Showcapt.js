import FadeIn from 'react-fade-in';

const Showcapt = ({text}) => {
    return (
        <div>
            <FadeIn>
            <h4> Generated Caption: </h4>
            <h5>{text}</h5>
            </FadeIn>
        </div>
    )
}

export default Showcapt
