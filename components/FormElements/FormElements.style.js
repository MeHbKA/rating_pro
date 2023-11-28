import styled from 'styled-components';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

const CustomInput = styled(TextField)`
  color: #33343D;
  font-weight: 400;
  font-size: 16px;
`;

const CheckboxStyle = styled(FormControlLabel)`
  .MuiFormControlLabel-label {
    font-weight: 400;
    font-size: 12px;
    line-height: 14px;
    color: #33343D;
  }
`;

export { CheckboxStyle, CustomInput };