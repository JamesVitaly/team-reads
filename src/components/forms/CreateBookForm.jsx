import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Field, withFormik } from 'formik';
import { openAlert } from 'simple-react-alert';
import * as Yup from 'yup';
import api from '../../modules/api-call';
import TextInput from '../_common/form-components/TextInput';
import Form from '../_common/form-components/Form';
import Button from '../_common/Button';
import SelectInput from '../_common/form-components/SelectInput';
import Divider from '../_common/Divider';
import theme from '../../theme';

const CreateBookForm = ({ className, shelves, isSubmitting }) => {
    return (
      <div className={className}>
        <h2>To start a discussion, try adding a book to your collection</h2>
        <Divider />
        <Form>
          <Field
            name="title"
            type="text"
            label="Title"
            placeholder="The lean startup"
            component={TextInput}
            />
            <Field
              name="author"
              type="text"
              label="Who wrote it"
              placeholder="Eric Reis"
              component={TextInput}
              />
          <Button
            type="submit"
            label="Create book"
            isLoading={isSubmitting}
          />
        </Form>
      </div>
    );
  }

CreateBookForm.propTypes = {
  className: PropTypes.string,
  shelves: PropTypes.arrayOf(PropTypes.object),
  userId: PropTypes.string,
  isSubmitting: PropTypes.bool,
  addBookToState: PropTypes.func,
};

CreateBookForm.defaultProps = {
  className: undefined,
  shelves: undefined,
  userId: undefined,
  isSubmitting: undefined,
  addBookToState: undefined,
};

export default withFormik({
  mapPropsToValues: props => ({
    userId: props.userId,
    title: '',
    author: '',
  }),
  validationSchema: Yup.object().shape({
    title: Yup.string().required('Tell us the title!'),
    author: Yup.string().required('Let us know who wrote it'),
  }),
  enableReinitialize: true,
  handleSubmit: (values, { setSubmitting, props }) => {
    console.log('submitting')
    setSubmitting(true);
    api.post(`book`, {
      name: values.title,
      author: values.author,
      ownerId: values.userId,
    })
      .then((response) => {
        openAlert({ message: 'Success! You added a book to your shelf', type: 'success' });
        setSubmitting(false);
        const book = response.data
        console.log(book);
        props.addBookToState(response.data);
      })
      .catch((error) => {
        openAlert({ message: `Error: ${error}`, type: 'danger' });
        setSubmitting(false);
      });
  },
})(styled(CreateBookForm)`
  margin: 0;
`);
