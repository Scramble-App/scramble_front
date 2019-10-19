import React from "react";
import {connect} from "react-redux";
import {Field, Form as FinalForm} from "react-final-form";
import {currentUserSelector} from "../../redux/selectors";

const Account = ({ user }) => (
  <div>
    <div>
      <p>Email: {user.email}</p>
      <p>Full name: {user.fullname}</p>
    </div>
    <div>
      Company info
    </div>
    <div>
      Stats
    </div>
    <div>
      Fundraising
    </div>
    <div>
      Income requests
    </div>
    <div>
      Notifications
    </div>
    <div>
      Total guarantees
    </div>
    <div>
      Log out
    </div>
  </div>
);

export default connect(
  (state) => ({
    user: currentUserSelector(state)
  })
)(Account)



