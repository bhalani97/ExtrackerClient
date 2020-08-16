import { Modal, Button, Input } from "antd";
import React from "react";
import { Select, Radio, DatePicker, Space } from "antd";
import account from "../../API/account";
import transcation from "../../API/transcation";
import moment from "moment";
const { Option } = Select;
class TranscationDetailForm extends React.Component {
  state = { visible: true, account: [], owner: this.props.userId };

  componentDidMount() {
    account
      .get(this.props.userId)
      .then((data) => this.setState({ account: data.data }));
    if (this.props.edit) {
      let { id, amount, date, detail, fortype, type } = this.props.formData;
      date = moment(date);
      this.setState({
        id,
        amount,
        date,
        detail,
        fortype,
        type,
        fromaccount: this.props.formData.fromaccount.id,
      });
    }
  }

  showModal = () => {
    if (!this.props.edit) {
      this.setState({
        visible: true,
        detail: "",
        amount: "",
        type: "credit",
        loadingbtn: false,
        fromaccount: "",
        fortype: "",
        date: moment().format("DD/MM/YYYY"),
      });
    }
  };

  handleOk = (e) => {
    console.log(this.state);
    this.setState({
      loadingbtn: true,
    });
    const {
      owner,
      type,
      fromaccount,
      amount,
      date,
      detail,
      fortype,
      id,
    } = this.state;
    if (this.props.edit) {
      transcation
        .update({ owner, type, fromaccount, amount, date, detail, fortype, id })
        .then((data) => {
          if ((data.statusText = "OK")) {
            this.props.handleCancel();
          } else {
            this.setState({
              loadingbtn: false,
              errorMsg: "Something went wrong",
            });
          }
        })
        .catch((error) => {
          this.setState({
            loadingbtn: false,
            errorMsg: "Something went wrong",
          });
        });
    } else {
      transcation
        .add({ owner, type, fromaccount, amount, date, detail, fortype })
        .then((data) => {
          if ((data.statusText = "OK")) {
            this.props.handleCancel();
          } else {
            this.setState({
              loadingbtn: false,
              errorMsg: "Something went wrong",
            });
          }
        })
        .catch((error) => {
          this.setState({
            loadingbtn: false,
            errorMsg: "Something went wrong",
          });
        });
    }
  };

  handleCancel = (e) => {
    console.log(e);
    this.props.handleCancel();
  };
  handleChange = (e) => {
    console.log(e.target.name);
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onChange = (value) => {
    this.setState({
      type: value,
    });
  };
  handleDateChange = (value) => {
    this.setState({
      date: value,
    });
  };
  handleSelect = (name, value) => {
    console.log(name);
    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div>
        <Modal
          title="Add"
          visible={this.state.visible}
          okButtonProps={{ loading: this.state.loadingbtn }}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.state.errorMsg ? <p>{this.state.errorMsg}</p> : null}
          <Input
            name="detail"
            placeholder="Details"
            onChange={(e) => this.handleChange(e)}
            value={this.state.detail}
          ></Input>
          <br />
          <Input
            name="amount"
            placeholder="Amount"
            value={this.state.amount}
            onChange={(e) => this.handleChange(e)}
          ></Input>
          <Radio.Group
            onChange={(e) => this.handleChange(e)}
            name="type"
            value={this.state.type}
          >
            <Radio value={"credit"}>Credit</Radio>
            <Radio value={"debit"}>Debit</Radio>
          </Radio.Group>
          <Select
            style={{ width: 200 }}
            placeholder="From Account"
            optionFilterProp="children"
            name="fromaccount"
            value={this.state.fromaccount}
            onChange={(v) => this.handleSelect("fromaccount", v)}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {this.state.account.map((d) => {
              return <Option value={d.id}>{d.name}</Option>;
            })}
          </Select>
          <Select
            style={{ width: 200 }}
            placeholder="For?"
            optionFilterProp="children"
            name="fortype"
            onChange={(v) => this.handleSelect("fortype", v)}
            value={this.state.fortype}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="home">Home</Option>
            <Option value="personal">Personal</Option>
            <Option value="lend">Lend</Option>
            <Option value="other">Other</Option>
          </Select>
          <Space direction="vertical" size={12}>
            <DatePicker
              className="transcationDate"
              onChange={this.handleDateChange}
              defaultValue={this.state.date}
              format={"DD/MM/YYYY"}
            />
          </Space>
          ,
        </Modal>
      </div>
    );
  }
}
export default TranscationDetailForm;
