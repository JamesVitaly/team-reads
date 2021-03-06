import React from 'react';
import PropTypes from 'prop-types';
import TeamBookList from '../views/TeamBookList';
import Callback from '../components/Callback';
import api from '../modules/api-call';
import { ascending } from '../modules/sort-by-date';

class TeamBookListContainer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      isLoading: true,
    }
  }

  componentDidMount() {
    const { teamId } = this.props;
    console.log(teamId)
    if (teamId) {
    api.get(`book?teamId=${teamId}`)
    .then((res) => {
      this.setState({
        books: ascending(res.data.data),
        isLoading: false,
      });
    })
    .catch(err => {
      console.log(err)
      this.setState({
        isLoading: false,
      })
    })
    }
  }

  assignOwnersToBooks() {
    const { books } = this.state;
    const { teamMembers } = this.props;
    let newBooks;
    if (books && teamMembers) {
      console.log('here')
      newBooks = books;
      newBooks.forEach((book, index) => {
        teamMembers.forEach((user) => {
          if (book.ownerId === user._id){
            newBooks[index].owner = user.username;
          }
        })
      })
    }
    return newBooks;
  }

  render() {
    const {
      isLoading,
      books,
    } = this.state;
    const { userId, teamId, teamName, teamMembers} = this.props;
    console.log(books)
    return isLoading ? <Callback /> :
    <TeamBookList
      userId={userId}
      books={this.assignOwnersToBooks()}
      teamId={teamId}
      teamName={teamName}
      teamMembers={teamMembers}
    />
  }
}

TeamBookListContainer.propTypes = {
  teamId: PropTypes.string,
  teamMembers: PropTypes.arrayOf(PropTypes.object),
  teamName: PropTypes.string,
};

TeamBookListContainer.defaultProps = {
  teamId: undefined,
  teamMembers: undefined,
  teamName: undefined,
};

export default TeamBookListContainer;
