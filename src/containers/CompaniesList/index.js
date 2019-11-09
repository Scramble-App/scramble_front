import React, {useEffect} from 'react'
import styles from "./CompaniesList.module.scss";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {Button, Card, Col, Row, Select, Slider, Tabs} from "antd";
import {companiesListSelector} from "../../ducks/companies/selectors";

const CompaniesList = ({dispatch, companies}) => {
  useEffect(() => {
    dispatch({type: 'FETCH_COMPANIES_REQUEST'})
  }, []);

  return (
    //  TODO move to component view
    <Row gutter={32}>
      <Col offset={4} span={16}>
        <Tabs>
          <Tabs.TabPane tab="Search" key={1}>
            <div className={styles.tabContentWrapper}>
            <Row gutter={32}>
              <Col span={8}>
                <h3>Filters</h3>
                <Select
                  mode="multiple"
                  style={{width: '200px'}}
                  placeholder="Industry"
                >
                  <Select.Option key={1}>Aerospace</Select.Option>
                  <Select.Option key={2}>Transport</Select.Option>
                  <Select.Option key={3}>Computer</Select.Option>
                </Select>
                <div className={styles.filterSliderWrapper}>
                  <p>Annual Turnover</p>
                  <Slider
                    range
                    step={10}
                    defaultValue={[20, 50]}
                  />
                  <p>Company age</p>
                  <Slider
                    range
                    step={1}
                    defaultValue={[1, 10]}
                    max={10}
                  />
                  <p>Employees number</p>
                  <Slider
                    range
                    step={10}
                    defaultValue={[1, 200]}
                    max={1000}
                  />
                  <Button type="default" className={styles.leftButton}> All</Button>
                  <Button type="default">Watchlist</Button>
                </div>
              </Col>
              <Col span={16}>
                <div className={styles.subHeader}>
                  <h2>Companies list</h2>
                </div>
                <div className={styles.companiesList}>
                  {companies.map(({name, id, founder}) => (
                    <Card key={`${name}_${id}`} className={styles.companyCard}>
                      <Link to={`/companies/${id}`}>
                        {name}
                      </Link>
                      {founder.trim().length > 0 && <p className={styles.founder}>Founder: {founder}</p>}
                    </Card>
                  ))}
                </div>
              </Col>
            </Row>
            </div>
          </Tabs.TabPane>
          <Tabs.TabPane tab="Power BI" key={2}>
            <iframe title="Power BI data" width="100%" height="541.25"
                    src="https://app.powerbi.com/reportEmbed?reportId=e9c0bf82-f997-42b2-8fb6-db78a15b46ce&autoAuth=true&ctid=dd0bea93-74d1-4e09-bf5f-8d90c0308096&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXVzLWVhc3QyLWItcHJpbWFyeS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D"
                    frameBorder="0" allowFullScreen="true"/>
          </Tabs.TabPane>
        </Tabs>
      </Col>
    </Row>
  )
};

export default connect(state => ({
  companies: companiesListSelector(state),
}), null)(CompaniesList);
