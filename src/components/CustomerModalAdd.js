import React, { Component } from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    hidden: {
        display: 'none'
    }
});

class CustomerModalAdd extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id : 0,            
            image : '',
            name: '',
            birthday: '',
            gender: '',
            job: '',
            open: false
        }
    }

    handleClickOpen = () => {
        this.setState({
            open: true
        });
    }

    handleClickClose = () => {
        this.setState({
            id : 0,
            image : '',
            name: '',
            birthday: '',
            gender: '',
            job: '',
            open: false
        });     
    }

    handleValueChange = (e) => {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        this.addCustomer()
            .then((res) => {
                console.log("★★★ 결과 !!!\n" + JSON.stringify(res.data,null,2));
                /**
                 * 자식 컴포넌트에서 부토 컴포넌트의 함수 실행 (SPA 형태)
                 * window.location.reload(); //화면 전체 리로딩 ==> SPA 형태로 바뀐 부문만 리 랜더링
                 * 자식 컴포넌트에서 부모 컴포넌트로 부터 전달받은 props형태의 함수 실행
                 */
                this.props.stateRefresh(); 
            })
            .catch((err) => {
                console.log("★★★ 에러 !!!\n" + err);
            });
        this.setState({
            id : 0,
            image : '',
            name: '',
            birthday: '',
            gender: '',
            job: '',
            open: false            
        });  
        //window.location.reload(); //화면 전체 리로딩

    }

    addCustomer = () => {
        const url = "/customer/insert";
        const params = {};
        params.image = this.state.image;
        params.name = this.state.name;
        params.birthday = this.state.birthday;
        params.gender = this.state.gender;
        params.job = this.state.job;
        console.log(" ★★★ request!!! \n" + JSON.stringify(params, null,2)); 
        const jsonData = JSON.stringify(params);                              
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        };
        return axios.post(url, jsonData, config);
    }
    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
                    고객 추가하기
                </Button>
                <Dialog open={this.state.open} onClose={this.handleClickClose}>
                    <DialogTitle>고객추가</DialogTitle>
                    <DialogContent>
                        <TextField label="프로필이미지" type="text" name="image" value={this.state.fileName} onChange={this.handleValueChange}/><br/>
                        <TextField label="이름" type="text" name="name" value={this.state.name} onChange={this.handleValueChange}/><br/>
                        <TextField label="생년월일" type="text" name="birthday" value={this.state.birthday} onChange={this.handleValueChange}/><br/>
                        <TextField label="성별" type="text" name="gender" value={this.state.gender} onChange={this.handleValueChange}/><br/>
                        <TextField label="직업" type="text" name="job" value={this.state.job} onChange={this.handleValueChange}/><br/>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={this.handleSubmit}>추가</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>닫기</Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(CustomerModalAdd);