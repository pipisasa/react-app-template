import React, { Component } from 'react';
import { loginUser } from '../../redux/actions';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';

class Home extends Component {
  render() {
    return (
      <div>
        <h1> Home </h1>
        <Row className="flex-column">
          <Col md={6} sm={12}>
            <Card>
              <CardBody>
                Hello
              </CardBody>
            </Card>
          </Col>
          
          <div className="col-md-6">
            <Card>
              <CardBody>
                Hello
              </CardBody>
            </Card>
          </div>

        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.Auth;
  return { user }
}

export default connect(mapStateToProps, { loginUser })(Home);
