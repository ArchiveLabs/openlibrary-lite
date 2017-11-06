import React, {Component} from 'react';
import {Page, Navbar, ContentBlockTitle, List, ListItem, FormLabel, FormInput, Button, GridCol, GridRow, ContentBlock, ButtonsSegmented} from 'framework7-react';

const onChangeHandler = (event) => {
    console.log('change');
};

const pStyle = {margin: '1em 0'};

export class Form extends Component {
    constructor(props, context) {
        super(props, context);

        this.state = {
            birthDate: '2014-04-30',
            radioSelected: 1
        };
    }

    onRadioChange(value) {
        this.setState({
           ...this.state,
           radioSelected: value
        });
    }

    render() {
        return (
            <Page>
                <Navbar backLink="Back" title="Forms" sliding />

                <ContentBlockTitle>Settings</ContentBlockTitle>
                <List form>
                </List>

            </Page>
        );
    }
};
