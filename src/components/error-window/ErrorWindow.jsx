import "./ErrorWindow.css";
import { useState } from "react";


const ErrorWindow = ({errorText}) => {
    console.log(errorText)
    const [isOpenWindowError,openWindowError] = useState(false);

    const windowError = () =>{
      if(errorText !== null){
        openWindowError(true);
      }
    }
    return ( 
    <div className="errorWindow-content">
        <div className="warning-error__text">
            Ошибка
        </div>
        <div className="errorWindow-text">
            {errorText.name}
        </div>
        <div className="errorWindow-text">
        {errorText.price}
        </div>
    </div>
     );
}
 
export default ErrorWindow;