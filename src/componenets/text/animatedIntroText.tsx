import './animatedIntroText.css'

type AnimatedIntroTextProps = {
    text: string,
    replacements: {}
}
function AnimatedIntroText({text, replacements}: AnimatedIntroTextProps) {
    return (
        <div className='text-container'>
            <p>{text}</p>
        </div>
    )
}

export default AnimatedIntroText