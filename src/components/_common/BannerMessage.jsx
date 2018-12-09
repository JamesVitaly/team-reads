import React from 'react';
import PropTypes from 'prop-types';
import Button from './Button';
import DangerButton from './DangerButton';
import ButtonGroup from './ButtonGroup';
import theme from '../../theme';
import styled from 'styled-components';

const BannerMessage = ({
  className,
  message,
  action,
  actionLabel,
  closeLabel,
  closeAction,
  meta,
  actionLoading,
  closeLoading,
}) => (
  <div className={className}>
    <div className="message">
      <p>{message}</p>
    </div>
    <div className="actions">
      <ButtonGroup>
        <Button
          label={actionLabel}
          isLoading={actionLoading}
          onClick={() => action(meta)}
          />
        <DangerButton
          label={closeLabel}
          onClick={() => closeAction(meta)}
          />
      </ButtonGroup>
    </div>
  </div>
);

BannerMessage.propTypes = {
  message: PropTypes.string,
  action: PropTypes.func,
  closeAction: PropTypes.func,
  actionLabel: PropTypes.string,
  closeLabel: PropTypes.string,
  actionLoading: PropTypes.bool,
  closeLoading: PropTypes.bool,
  meta: PropTypes.string,
};

BannerMessage.defaultProps = {
  message: undefined,
  action: undefined,
  closeAction: undefined,
  actionLabel: undefined,
  closeLabel: undefined,
  actionLoading: PropTypes.bool,
  closeLoading: PropTypes.bool,
  meta: PropTypes.string,
};

export default styled(BannerMessage)`
  box-sizing: border-box !important;
  border-radius: ${theme.borderRadius}px;
  width: 95%;
  display: flex;
  .message {
    width: 70%;
    padding: 0;
    margin: auto 0;
    color: #fff;
    p {
      font-weight: 500 !important;
    }

  }
  background: ${theme.colors.alert};
  margin: 0px 20px ${theme.baseMargin}px 10px;
  padding: 0px 10px;
`;
