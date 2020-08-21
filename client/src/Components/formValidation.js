import React from 'react'
import { Schema, FormGroup, ControlLabel, FormControl } from "rsuite";

const { StringType } = Schema.Types;
export const model = Schema.Model({
    username: StringType().isRequired('This field is required.'),
    email: StringType()
        .isEmail('Please enter a valid email address.')
        .isRequired('This field is required.'),
    password: StringType().isRequired('This field is required.'),
    verifyPassword: StringType()
        .addRule((value, data) => {
            if (value !== data.password) {
                return false;
            }

            return true;
        }, 'The two passwords do not match')
        .isRequired('This field is required.')
});

export class TextField extends React.PureComponent {
    render() {
        const { name, label, value, onChange, accepter, ...props } = this.props;
        return (
            <FormGroup>
                <ControlLabel>{label} </ControlLabel>
                <FormControl name={name} onChange={onChange} value={value} accepter={accepter} {...props} />
            </FormGroup>
        );
    }
}
