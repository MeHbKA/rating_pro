import { ButtonStyle } from './Button.style';

export default function Button({fullWidth, title, action}) {

  let buttonOptions = { fullWidth };

return (
  <ButtonStyle onClick={() => action()} {...buttonOptions} variant="contained">  
        {title}
  </ButtonStyle>
);

}