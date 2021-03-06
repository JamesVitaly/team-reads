import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import theme from '../../theme';


const Button = (props) => {
  const {
    className,
    label,
    icon,
    onClick,
    type,
    isLoading,
    link,
    theme,
    status,
  } = props;
  return !link ? (
    <div className={`${className} Button`}>
      <button
        type={type}
        className={`${theme} ${status}`}
        onClick={onClick}
      >
        {icon && !isLoading ? <i className={icon} /> : null}
        {isLoading && <i className="fas fa-spinner fa-spin" />}
        {!isLoading && label}
        {isLoading && "Loading"}
      </button>
    </div>) :
    <div className={`${className} Button Button-link`}>
      <a href={link}>
        <button
          type={type}
          className={`${theme} ${status}`}
          onClick={onClick}
        >
      {icon && !isLoading ? <i className={icon} /> : null}
      {isLoading && <i className="fas fa-spinner fa-spin" />}
      {!isLoading && label}
      {isLoading && "Loading"}
          </button>
      </a>
    </div>
};

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  icon: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  link: PropTypes.string,
  isFullWidth: PropTypes.bool,
  theme: PropTypes.string,
  status: PropTypes.string,
};

Button.defaultProps = {
  isFullWidth: undefined,
  label: undefined,
  onClick: undefined,
  icon: undefined,
  className: undefined,
  type: undefined,
  isLoading: undefined,
  link: undefined,
  theme: undefined,
  status: undefined,
};

export default styled(Button)`
    margin: 0px 0px 0px 0px;
  i {
    font-size: 14px;
    margin: 0;
    padding: 0px 7px 0px 7px;
    text-decoration: none !important;
  }
  .secondary {
    background-color: transparent !important;
    border: ${props => `2px solid ${theme.colors[props.theme]}`};
    color: ${props => `${theme.colors[props.theme]}`};
  }
  .info {
    background-color: ${theme.colors.info} !important;
  }
  .success {
    background: ${theme.colors.success};
  }
  .success:hover {
    background: ${theme.colors.successSelect};
  }
  .highlight {
      background: #0744DD;

  }
  .highlight:hover {
    background: ${theme.colors.primaryBright};
  }
  .danger {
    background: ${theme.colors.danger};
  }
  .link {
    box-shadow: none !important;
    background-color: transparent;
    color: ${theme.colors.primary};
    border: 2px solid ${theme.colors.grey};
    &:hover {
      background-color: ${theme.colors.lightGrey};
    }
  }
  a {
    margin: 0;
    padding: 0;
    color: white;
  }
  button {
    box-shadow: ${theme.boxShadow};
     transition: box-shadow 0.3s ease-in-out;
    &:hover {
      box-shadow: ${theme.strongBoxShadow};
    }
    display: flex;
    height: 35px;
    justify-content: center;
    background: ${theme.colors.success};
    font-size: 16px;
    border: none;
    color: white;
    border-radius: 4px;
    font-weight: bold;
    min-width: 80px;
    width: ${props => props.isFullWidth ? '100%' : ''};
    padding: 0px 20px;
    cursor: pointer;
    font-family: 'Nunito', sans-serif;
    i {
      font-size: 14px;
      margin: auto 0;
      padding: auto 7px;
      text-decoration: none !important;
    }
  }
`;
