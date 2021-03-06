import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import * as Yup from 'yup';
import { Field, withFormik } from 'formik';
import { openAlert } from 'simple-react-alert';
import api from '../../modules/api-call';
import Form from '../_common/form-components/Form';
import Textarea from '../_common/form-components/Textarea';
import Button from '../_common/Button';

class AddCommentForm extends React.Component {
  render() {
    const { isSubmitting, commentId } = this.props;
    return (
      <React.Fragment>
        <Form>
          <Field
            label={!commentId ? "Add a comment" : ""}
            name="comment"
            component={Textarea}
            rows={5}
          />
        <Button
          theme="link"
          type="submit"
          isLoading={isSubmitting}
          isFullWidth
          label={!commentId ? "Add comment" : "Update comment"}
          />
        </Form>
      </React.Fragment>
    );
  }
}

AddCommentForm.propTypes = {
  userId: PropTypes.string,
  comments: PropTypes.arrayOf(PropTypes.object),
  discussionId: PropTypes.string,
  text: PropTypes.string,
  isSubmitting: PropTypes.bool,
  commentId: PropTypes.string,
  toggleEditState: PropTypes.func,
};

AddCommentForm.defaultProps = {
  userId: undefined,
  comments: undefined,
  discussionId: undefined,
  text: undefined,
  isSubmitting: false,
  commentId: undefined,
  toggleEditState: undefined,
};

export default withFormik({
  mapPropsToValues: props => ({
    comment: props.text || "",
  }),
  validationSchema: Yup.object().shape({
    comment: Yup.string().required('Please write a comment!'),
  }),
  handleSubmit: (values, { setSubmitting, resetForm, props }) => {
    console.log(props)
    setSubmitting(true);
    if (!props.commentId) {
    api.post(`comment`, {
      userId: props.userId,
      discussionId: props.discussionId,
      text: values.comment,
    })
      .then((response) => {
        setSubmitting(false);
        const comment = response.data
        console.log(comment);
        openAlert({ message: 'Your comment has been added', type: 'success' });
        const comments = props.comments.map(comment => comment._id);
        comments.push(comment._id)
        api.put(`discussion/${props.discussionId}`, {
          comments,
        })
        .then(res => console.log(res))
        .catch(err => console.log(err));
          resetForm();
          props.updateComments(comment);
      })
      .catch((error) => {
        openAlert({ message: `Error: ${error}`, type: 'danger' });
        setSubmitting(false);
      });
    } else {
      api.put(`comment/${props.commentId}`, {
        text: values.comment,
      })
        .then((response) => {
          setSubmitting(false);
          const comment = response.data
          console.log(comment);
          openAlert({ message: 'Your comment has been updated', type: 'success' });
          props.updateComments(comment);
          props.toggleEditState();
        })

    }
  },
})(styled(AddCommentForm)`
  margin: 0;
`);
