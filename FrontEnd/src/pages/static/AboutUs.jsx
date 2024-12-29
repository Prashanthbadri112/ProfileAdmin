import { Row } from "react-bootstrap";
import Layout from "../../components/layout/Layout";


const AboutUs = () => {
    return (
      <Layout>
        <h3 class="text-center">About Us</h3>
        <Row class="justify-content-center">
          <div class="text-center">
            Learning React, NodeJS and ExpressJS is so fun.
            <br />I will see you very soon!
          </div>
        </Row>
      </Layout>
    );
  };

  export default AboutUs;
