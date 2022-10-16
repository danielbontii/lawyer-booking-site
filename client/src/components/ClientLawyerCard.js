import { Container, Row, Col } from "react-bootstrap";

const ClientLawyerCard = ({
  caseTitle,
  caseDescription,
  clientId,
  firstName,
  otherNames,
  lastName,
  phone,
  email,
  handleViewCase,
}) => {
  return (
    <Container className="bg-white rounded my-2 client-card border-top border-5 border-primary p-3">
      <Row clientId={clientId}>
        <Col className="col-4">
          <h3 className="fs-4">Case Title: </h3>
        </Col>
        <Col>
          <h3 className="fs-5">{caseTitle.substring(0, 60)}...</h3>
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <p>Case Description:</p>
        </Col>
        <Col>
          <p className="d-inline">{caseDescription.substring(0, 150)}...</p>
          <button
            className="btn btn-link d-inline"
            onClick={(id) => handleViewCase(id)}
          >
            Read More
          </button>
        </Col>
      </Row>
      <Row>
        <Col className="col-4">
          <p>Client: </p>
        </Col>
        <Col>
          <p className="m-0">
            {firstName} {otherNames !== "" && otherNames} {lastName}
          </p>
          <p className="m-0">{email}</p>
          <p className="m-0">{phone}</p>
        </Col>
      </Row>
    </Container>
  );
};

export default ClientLawyerCard;
