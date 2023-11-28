import { CheckboxStyle } from './FormElements.style';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormHelperText from '@mui/material/FormHelperText';
import Image from 'next/image';

const ChecboxIcon = () => {
    return(
        <Image src="/icons/checkbox.svg" width={23} height={23}/>
    )
};

const ChecboxActiveIcon = () => {
    return(
        <Image src="/icons/checkbox-active.svg" width={23} height={23}/>
    )
};

export default function CustomCheckbox(props) {

return (
    <>
        <CheckboxStyle {...props} control={<Checkbox icon={<ChecboxIcon/>} checkedIcon={<ChecboxActiveIcon/>}/>}/>
        {props.error && <FormHelperText>{props.helperText}</FormHelperText>}
    </>
);

};
