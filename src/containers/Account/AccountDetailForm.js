import { Modal, Button, Input } from "antd";
import React from "react";
import { Select } from "antd";
import account from "../../API/account";

const { Option } = Select;
class AccountDetailForm extends React.Component {
  state = { visible: true };

  showModal = () => {
    this.setState({
      visible: true,
      name: "",
      balance: "",
      type: "",
      loadingbtn:false
    });
  };

  handleOk = (e) => {
    this.setState({
      loadingbtn:true
    })
    const {name,balance,type} = this.state
    account.add({name,balance,type}).then(data=>{
      if(data.statusText="OK"){
        this.props.handleCancel();
      }
      else{
        this.setState({
          loadingbtn:false,
          errorMsg:'Something went wrong'
        })
      }
   

    }).catch(error=>{
      this.setState({
        loadingbtn:false,
        errorMsg:'Something went wrong'
      })
    })

  };

  handleCancel = (e) => {
    console.log(e);
    this.props.handleCancel();
  };
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  onChange=(value) =>{
    this.setState({
      type: value,
    });
  }
  render() {
    return (
      <div>
        <Modal
          title="Add Account"
          visible={this.state.visible}
          okButtonProps={{loading:this.state.loadingbtn}}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          {this.state.errorMsg? <p>{this.state.errorMsg}</p>:null}
          <Input
            name="name"
            placeholder="Name"
            onChange={(e) => this.handleChange(e)}
          ></Input>
          <br />
          <Input
            name="balance"
            placeholder="Balance"
            onChange={(e) => this.handleChange(e)}
          ></Input>
          <Select
            style={{ width: 200 }}
            placeholder="Select Account Type"
            optionFilterProp="children"
            name="type"
            onChange={this.onChange}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option value="creditcard">CreditCard</Option>
            <Option value="bank">Bank</Option>
            <Option value="cash">Cash</Option>
          </Select>
        </Modal>
      </div>
    );
  }
}
export default AccountDetailForm;
