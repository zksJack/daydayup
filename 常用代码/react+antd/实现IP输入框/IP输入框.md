```

/**
 * zks 2021 10 26
 * ip输入框，作用于新建与修改虚拟子网  
 * 使用方式：参看antd-form自定义表单控件。
 *  onchange 是自已定义的参数  避免跟from 表单的onChange冲突。
 */
import React  from 'react';
import { Input} from 'antd';
import styles from './index.less'
class IpInput extends React.Component{
    constructor(){
        super();
        this._refs = {
          refip_0:React.createRef(),
          refip_1:React.createRef(),
          refip_2:React.createRef(),
          refip_3:React.createRef()
        };
    }
    handleNumberChange = (e,type) => {
        //确保最小值为0；
        const number = parseInt(e.target.value || 0, 10);
        if (isNaN(number)) {
          return;
        }
        let Obj = {}
        Obj[`${type}`] = number
        this.triggerChange(Obj);
    };
    triggerChange = changedValue => {
        const { onChange, value,onchange } = this.props;
        if (onChange) {
          onChange({
            ...value,
            ...changedValue,
          });
        }
        if(onchange){
          onchange({
            ...value,
            ...changedValue,
          })
        }
      };
    turnIpPOS = (e,type)=>{
        let self = this;
         //左箭头向左跳转，左一不做任何措施
        if(e.keyCode === 37) {
          if(type === 0) {} else {
            self._refs[`refip_${type-1}`].current.focus();
          }
        }
        //右箭头、回车键、空格键、冒号均向右跳转，右一不做任何措施
        if(e.keyCode === 39 || e.keyCode === 13 || e.keyCode === 32 || e.keyCode === 190) {
           if(type === 3) {} else {
            self._refs[`refip_${type+1}`].current.focus();
           }
        }
    }
    render(){
        const { value } = this.props;
        return (
            <Input.Group compact className = {styles.inputGroup}>
              <Input style={{ width: '24%' }} className = {styles.self_input} ref = {this._refs.refip_0} value = {value?.ip_0||0} maxLength ={3} onChange={(e)=>{this.handleNumberChange(e,'ip_0')}} onKeyUp ={(e)=>this.turnIpPOS(e,0)}/>
              <span className = {styles.dot} ></span>
              <Input style={{ width: '24%' }} className = {styles.self_input} ref = {this._refs.refip_1} value = {value?.ip_1||0} maxLength ={3} onChange={(e)=>{this.handleNumberChange(e,'ip_1')}} onKeyUp ={(e)=>this.turnIpPOS(e,1)}/>
              <span className = {styles.dot}></span>
              <Input style={{ width: '24%' }} className = {styles.self_input} ref = {this._refs.refip_2} value = {value?.ip_2||0} maxLength ={3} onChange={(e)=>{this.handleNumberChange(e,'ip_2')}} onKeyUp ={(e)=>this.turnIpPOS(e,2)}/>
              <span className = {styles.dot}></span>
              <Input style={{ width: '24%' }} className = {styles.self_input} ref = {this._refs.refip_3} value = {value?.ip_3||0} maxLength ={3} onChange={(e)=>{this.handleNumberChange(e,'ip_3')}} onKeyUp ={(e)=>this.turnIpPOS(e,3)}/>
            </Input.Group>
        )
    }
   
}
export default IpInput;
```

css文件
```
.inputGroup {
  border: 1px solid #d9d9d9;
  border-radius: 2px;
  transition: all 0.3s;
  &:hover {
    border-color: #45bbff;
    border-right-width: 1px !important;
    outline: 0;
    box-shadow: 0 0 0 2px rgba(29, 165, 255, 0.2);
  }
  text-align: center;
  .dot {
    width: 3px;
    height: 3px;
    border: 1px solid #000;
    border-radius: 3px;
    background-color: #000;
    opacity: 0.5;
    z-index: 9;
    position: relative;
    top: 15px;
  }
}

.self_input {
  border: none;
  outline: 0px;
  box-shadow: none;
  &:hover {
    box-shadow: none;
  }
  &::selection {
    box-shadow: none;
  }
  &:focus {
    box-shadow: none !important; 
  }
}

```

使用方式
```
 <Form onSubmit={this.handleOk} layout="horizontal" >
    <FormItem label="子网网关" {...formItemLayout}>
        {getFieldDecorator('gateway', {
          initialValue:{ ip_0: 0, ip_1: 0, ip_2: 0, ip_3: 0 },
          rules: [{ validator: this.checkIp }],
        })(<IPInput onchange={this.changeGateway}/>)}
    </FormItem>
    <FormItem label="子网掩码" {...formItemLayout}>
        {getFieldDecorator('netmask', {
            initialValue:{ ip_0: 0, ip_1: 0, ip_2: 0, ip_3: 0 },
            rules: [{ validator: this.validateMask }],
        })(<IPInput onchange={this.changeNetmask}/>)}
    </FormItem>
</Form>
```