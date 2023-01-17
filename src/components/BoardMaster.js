import React, { Component } from "react";

import UserService from "../services/user.service";

export default class BoardMaster extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: ""
        };
    }

    componentDidMount() {
        UserService.getUserBoard().then(
            response => {
                this.setState({
                    content: response.data
                });
            },
            error => {
                this.setState({
                    content:
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString()
                });
            }
        );
    }

    render() {
        return (
            <div>
                <header>
                    <h1>Master board</h1>
                    <h3>{this.state.content}</h3>
                </header>
            </div>
        );
    }
}
