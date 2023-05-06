import { Button, Card, CardBody, CardHeader, Col, Container, Row } from "reactstrap";

import { BoxHeader } from "@/views/layout/headers";

export const DemoBadgePanel = (): JSX.Element => {
  return (
    <>
      <BoxHeader />
      <Container className="mt--6" fluid>
        <Card className="mb-4">
          <CardHeader>
            <h3 className="mb-0">Demo Badge</h3>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="4">
                <div>
                  <h2>Styles</h2>
                  <span className="badge badge-default">Default</span>
                  <span className="badge badge-primary">Primary</span>
                  <span className="badge badge-secondary">Secondary</span>
                  <span className="badge badge-info">Info</span>
                  <span className="badge badge-success">Success</span>
                  <span className="badge badge-danger">Danger</span>
                  <span className="badge badge-warning">Warning</span>
                </div>
              </Col>
              <Col md="4">
                <div>
                  <h2>Pills</h2>
                  <span className="badge badge-pill badge-default">Default</span>
                  <span className="badge badge-pill badge-primary">Primary</span>
                  <span className="badge badge-pill badge-secondary">Secondary</span>
                  <span className="badge badge-pill badge-info">Info</span>
                  <span className="badge badge-pill badge-success">Success</span>
                  <span className="badge badge-pill badge-danger">Danger</span>
                  <span className="badge badge-pill badge-warning">Warning</span>
                </div>
              </Col>
              <Col md="4">
                <div>
                  <h2>Links</h2>
                  <a href="#" className="badge badge-pill badge-default">
                    Default
                  </a>
                  <a href="#" className="badge badge-pill badge-primary">
                    Primary
                  </a>
                  <a href="#" className="badge badge-pill badge-secondary">
                    Secondary
                  </a>
                  <a href="#" className="badge badge-pill badge-info">
                    Info
                  </a>
                  <a href="#" className="badge badge-pill badge-success">
                    Success
                  </a>
                  <a href="#" className="badge badge-pill badge-danger">
                    Danger
                  </a>
                  <a href="#" className="badge badge-pill badge-warning">
                    Warning
                  </a>
                </div>
              </Col>
            </Row>
            <br />
            <br />
            <br />
            <Row>
              <Col md="12">
                <div>
                  <h2>Buttons with badges</h2>
                  <Button className="btn btn-primary" color="primary">
                    <span>Unread messages</span>
                    <span className="badge badge-primary">24</span>
                  </Button>
                  <Button className="btn btn-primary" color="secondary">
                    <span>Unread messages</span>
                    <span className="badge badge-primary">24</span>
                  </Button>
                  <Button className="btn btn-primary" color="info">
                    <span>Unread messages</span>
                    <span className="badge badge-primary">24</span>
                  </Button>
                  <Button className="btn btn-primary" color="success">
                    <span>Unread messages</span>
                    <span className="badge badge-primary">24</span>
                  </Button>
                  <Button className="btn btn-primary" color="danger">
                    <span>Unread messages</span>
                    <span className="badge badge-primary">24</span>
                  </Button>
                  <Button className="btn btn-primary" color="warning">
                    <span>Notifications</span>
                    <span className="badge badge-md badge-circle badge-floating badge-danger border-white">
                      4
                    </span>
                  </Button>
                </div>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  );
};
