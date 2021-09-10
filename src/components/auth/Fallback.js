import React, { useState } from 'react'
import { PacmanLoader } from 'react-spinners'

const override = `
    display: block;
    margin: 0 auto;
    border-color: red;
`;

const Fallback = () => {

    let [loading] = useState(true);
    let [color] = useState("#D0021B");

    return (
        <div className="sweet-loading fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <PacmanLoader speedMultiplier={1} loading={loading} css={override} color={color} size={"30px"} />
        </div>
    )
}

export default Fallback
