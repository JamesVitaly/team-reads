import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Field, withFormik } from 'formik';
import { openAlert } from 'simple-react-alert';
import history from '../../modules/history';
import api from '../../modules/api-call';
import Form from '../_common/form-components/Form';
import TextInput from '../_common/form-components/TextInput';
import Button from '../_common/Button';

class FindTeamForm extends React.Component {
  render() {
    const { isSubmitting, className } = this.props;
    return (
      <div className={className}>
        <Form>
          <p>Need to join a team that already exists?</p>
          <Field
            name="teamSearch"
            label="Type out the name of a team"
            component={TextInput}
            searchBar
          />
        <Button
          type="submit"
          isLoading={isSubmitting}
          label="Find team"
          />
        </Form>
      </div>
    );
  }
}

FindTeamForm.propTypes = {
  userId: PropTypes.string,
};

FindTeamForm.defaultProps = {
  userId: undefined,
};

export default withFormik({
  mapPropsToValues: props => ({
    teamSearch: props.teamSearch || "",
  }),
  validationSchema: Yup.object().shape({
    teamSearch: Yup.string(),
  }),
  handleSubmit: (values, { setSubmitting, props }) => {
    setSubmitting(true);
    api.get(`team?search=${values.teamSearch}`)
      .then((response) => {
        setSubmitting(false);
        const teams = response.data.data;
        props.setSearchResults(teams);
      })
      .catch((error) => {
        openAlert({ message: `Error: ${error}`, type: 'danger' });
        setSubmitting(false);
      });
  },
})(styled(FindTeamForm)`
  margin: 0;
  button {
    width: 200px;
    margin: 0;
  }
`);
