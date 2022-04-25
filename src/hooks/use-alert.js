import { useAlert, positions } from "react-alert";
import { ERROR_ALERT_POSTFIX } from "../constants";

export const useAlertWrapper = () => {
    const alert = useAlert();
    const options = {
        position: positions.TOP_CENTER,
        timeout: 7000,
        offset: "30px"
    };

    return {
        success: (message) => {
            alert.success(message, options);
        },
        error: (message, usePostfix = false) => {
            if(usePostfix){
                alert.error(`${message} ${ERROR_ALERT_POSTFIX}`, options);
            }
            else{
                alert.error(message, options);
            }
        },
        warning: (message) => {
            alert.show(message, {...options, type: "warning"});
        },
        info: (message) => {
            alert.info(message, options);
        }
    };
}

export default useAlertWrapper;