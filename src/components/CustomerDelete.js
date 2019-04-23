import React, { Component } from 'react';
import axios from 'axios';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class CustomerDelete extends Component {

    constructor(props) {
        super(props);
        this.state = {
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
            open: false
        });     
    }
    deleteCustomer = async (id) => {
        try {
            const url = "/customer/delete/" + id;
            const response = await axios.get(url);
            console.log(" ★★★ CustomerDelete.js deleteCustomer 결과 : " + response.data);
            this.props.stateRefresh();            
        } catch (error) {
            console.log(" ★★★ CustomerDelete.js deleteCustomer 에러 : " + error );
        }
    }

    render() {
        return (
            <div>
                <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>삭제</Button>
                <Dialog open={this.state.open} onclose={this.handleClickClose}>
                    <DialogTitle>
                        삭제 경고
                    </DialogTitle>
                    <DialogContent>
                        <Typography gutterBottom>
                            선택한 고객정보가 삭제 됩니다.
                        </Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button variant="contained" color="primary" onClick={(e) => {this.deleteCustomer(this.props.id)}}>삭제</Button>
                        <Button variant="outlined" color="primary" onClick={this.handleClickClose}>삭제</Button>                        
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default CustomerDelete;