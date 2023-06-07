import React from 'react';

const WinningAnimation = (props) => {
return (
    <div className="WinningGif">
        <img src={props.gif}/>
    </div>
)
}

export default WinningAnimation;