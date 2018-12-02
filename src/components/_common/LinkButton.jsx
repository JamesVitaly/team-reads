import Button from './Button';
import styled from 'styled-components';
import theme from '../../theme';

const LinkButton = styled(Button)`
  background-color: transparent;
  color: ${theme.colors.primary};
  text-decoration: underline;
`;

export default LinkButton;
