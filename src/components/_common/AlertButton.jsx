import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Button from './Button';
import theme from '../../theme';

const AlertButton = styled(Button)`
  background-color: ${theme.colors.alert};
`;

export default AlertButton;
