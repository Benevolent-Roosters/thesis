import React from 'react';
import { setCurrentBoard, setBoards, postCreatedBoard, toggleCreateBoard } from '../redux/actionCreators.js';
import { connect } from 'react-redux';
import { Modal, Form, FormGroup, FormControl, Button, ControlLabel, Grid, Col, Row } from 'react-bootstrap';

const buttonStyle = {marginTop: '15px', marginRight: '15px'};

class CreateBoard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      board_name: '',
      repo_url: '',
      members: '',
      owner_id: this.props.owner_id
    };
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
      owner_id: this.props.owner_id
    });
  }

  render() {
    return (
      <div>
        <Grid>
          <Col sm={12}>
            <Row>
              <Modal show={this.props.createBoardRendered ? true : false}>
                <Modal.Header bsSize='large' style={{backgroundColor: '#7ED321'}}>
                  <Modal.Title style={{color: 'white'}}>Create Board</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form horizontal>
                      <FormGroup>
                        <Col componentClass={ControlLabel} sm={4}>Board Name</Col>
                        <Col sm={8}>
                        <FormControl name='board_name' bsSize="large" type="text" placeholder={'Board name'} onChange={this.handleInputChange.bind(this)}></FormControl>
                        </Col>
                      </FormGroup>

                      <FormGroup>
                        <Col componentClass={ControlLabel} sm={4}>Github Repo URL</Col>
                        <Col sm={8}>
                        <FormControl name='repo_url' bsSize="large" type="text" placeholder={'Github Repo'} onChange={ this.handleInputChange.bind(this)}></FormControl>
                        </Col>
                      </FormGroup>

                      <FormGroup>
                        <Col componentClass={ControlLabel} sm={4}>Add Members</Col>
                        <Col sm={8}>
                        <FormControl name='members' bsSize="large" type="text" placeholder={'enter emails separated by commas'} onChange={ this.handleInputChange.bind(this) }></FormControl>
                        </Col>
                      </FormGroup>

                      <Button style={buttonStyle} bsStyle="default" onClick={this.props.handleCreateBoardRendered}>Cancel</Button>
                      <Button style={buttonStyle} bsStyle="primary" type="button" onClick={() => {
                        let { members, ...newBoard} = this.state; 
                        this.props.handlePostCreatedBoard(newBoard); 
                        {/* this.props.handleSetCurrentBoard(newBoard);  */}
                        this.props.handleCreateBoardRendered();}}>Create</Button>
                    </Form>
                  </Modal.Body>
                </Modal>
                </Row>
              </Col>
            </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    'boards': state.rootReducer.boards,
    'currentBoard': state.rootReducer.currentBoard,
    'createBoardRendered': state.rootReducer.createBoardRendered,
    'boardBeingCreated': state.rootReducer.boardBeingCreated,
    'owner_id': state.rootReducer.user.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    handlePostCreatedBoard(boardObj) {
      dispatch(postCreatedBoard(boardObj));
    },
    handleCreateBoardRendered() {
      dispatch(toggleCreateBoard());
    },
    handleSetCurrentBoard(board) {
      dispatch(setCurrentBoard(board));
    }
  };
};

export var UnwrappedCreateBoard = CreateBoard;
export default connect(mapStateToProps, mapDispatchToProps)(CreateBoard);
