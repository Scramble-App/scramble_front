import React, {useEffect} from "react";
import {Col, Collapse, Row} from "antd";
import {Link} from "react-router-dom";
import {connect} from "react-redux";
import {ownCompanySelector} from "../../ducks/companies/selectors";

const MyCompany = ({company, dispatch}) => {
  useEffect(() => {
    dispatch({type: 'FETCH_COMPANIES_REQUEST'})
  }, [])
  return (
    <Row>
      <Col offset={4} span={12}>
        <h2>Company info</h2>
        <div>{company.name}</div>
        <Collapse>
          <Collapse.Panel key={1} header="PowerBI info">
            <iframe title="company PowerBI" width="100%" height="541.25"
                    src="https://app.powerbi.com/reportEmbed?reportId=034bdd15-a2b0-4223-a375-26f6d9320a59&autoAuth=true&ctid=dd0bea93-74d1-4e09-bf5f-8d90c0308096&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLWItcHJpbWFyeS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D"
                    frameBorder="0" allowFullScreen="true"/>
          </Collapse.Panel>
        </Collapse>
        <div>
          <Link to="/fundraising">Fundraising</Link>
        </div>
        <div>Notifications</div>
        <div>Total guarantees</div>
      </Col>
    </Row>
  )
}
export default connect(
  (state) => ({
    company: ownCompanySelector(state)
  }),
  null
)(MyCompany)
