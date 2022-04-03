import { React } from 'react';
import PropTypes from 'prop-types';

import '../css/Button.scss';

const Button = ({ id, color, text, onClick}) => {  
    let style = {};         
    if(color !== 'f857a8')
    {        
        const color2 = GetColor(color);
        color = '#' + color;
        style = {background: "linear-gradient(37deg, " + color + "," + color2 +")"};
    }
  return (
    <button id={id} onClick={onClick}> 
        <span id={id}>{text}</span>
        <div id={id} className="buttonColoring" style={style}></div>
    </button>
  )
  
}

Button.defaultProps = {
    color: 'f857a8'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

function GetColor(color)
{    
    var hex_color = parseInt(color, 16);
    var color_secondary;
    hex_color += parseInt('70bff');
    color_secondary = hex_color.toString(16);  
    color_secondary = '#' + color_secondary;
    return color_secondary;
}

export default Button
