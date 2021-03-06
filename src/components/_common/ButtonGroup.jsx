import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ButtonGroup = ({ className, children }) => (
  <div className={`${className} ButtonGroup`}>
    {children}
  </div>
);

ButtonGroup.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([
  PropTypes.arrayOf(PropTypes.node),
  PropTypes.node,
]).isRequired,
};

ButtonGroup.defaultProps = {
  className: undefined,
  children: undefined,
};

export default styled(ButtonGroup)`
  width: 100%;
  display: flex;
  padding: 0;
  margin: 0;
  flex-direction: row;
  justify-content: flex-start;
  text-align: left;
  flex-wrap: wrap;
  * {
    display: inline-block !important;
    margin-right: 5px;
  }
  button:first-of-type {
    margin-left: 0 !important;
  }
`;
