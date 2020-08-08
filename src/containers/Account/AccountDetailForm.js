import { Modal, Button, Input } from "antd";
import React from "react";
class AccountDetailForm extends React.Component {
  state = { visible: true };

  showModal = () => {
    this.setState({
      visible: true,
      bankname:'',
      balance:''
    });
  };

  handleOk = (e) => {
    console.log(this.state);
    this.props.handleCancel();
  };

  handleCancel = (e) => {
    console.log(e);
    this.props.handleCancel();
  };
  handleChange = (e)=>{
this.setState({
  [e.target.name]:e.target.value
})
  }
  render() {
    return (
      <div>
        <Modal
          title="Basic Modal"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <Input name="bankname" placeholder="Bank Name" onChange={(e)=>this.handleChange(e)}></Input><br/>
          <Input name="balance" placeholder="Balance" onChange={(e)=>this.handleChange(e)}></Input>

        </Modal>
      </div>
    );
  }
}
export default AccountDetailForm;
