import React from "react";
import { Modal, Button, DatePicker } from "antd";
import "./DateButton.css";
import { DatePickerView } from "antd-mobile";
import moment from "moment";
import { CalendarOutlined } from "@ant-design/icons";

const disabledDate = (current) => {
  return current < moment().startOf("day");
};

class DateButton extends React.Component {
  constructor(props) {
    super(props);
    // Don't call this.setState() here!
    // userDate is what is selected, its a placeholder. finalDate is what shouldbe actually used and what is set
    // after pressing ok button
    this.state = {
      visible: false,
      userDate: moment(),
      finalDate: moment(),
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
      finalDate: this.state.userDate,
    });
    // since datebutton was in mobilenavbar, had this but now its in map.js
    this.props.handleDate(this.state.userDate);
  };

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };

  changeDate = (newDate) => {
    this.setState({
      userDate: newDate,
    });
  };

  render() {
    return (
      <>
        <Button
          icon={<CalendarOutlined />}
          className="date-button"
          type="text"
          onClick={this.showModal}
        >
          {this.state.finalDate.format("MM/DD/YY")}
        </Button>
        <Modal
          title={"Choose Date"}
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okButtonProps={{ disabled: false }}
          cancelButtonProps={{ disabled: false }}
        >
          <DatePicker
            onChange={(date) => this.changeDate(date)}
            disabledDate={disabledDate}
            style={{ width: "100%" }}
          />
        </Modal>
      </>
    );
  }
}

export default DateButton;
