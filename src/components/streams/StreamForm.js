import React, { Component } from 'react';
import { Field, reduxForm } from 'redux-form';



class StreamForm extends Component {
    renderError = ({ error, touched }) => {
        if (touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">
                        {error}
                    </div>
                </div>
            );
        }
    };

    renderInput = ({ input, label, type, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input 
                    {...input} 
                    placeholder={label} 
                    type={type}
                    autoComplete="off"
                />
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    };
    
    render() {
        return (            
            <form 
                onSubmit={this.props.handleSubmit(this.onSubmit)} 
                className="ui form error"
            >
                <Field 
                    name="title" 
                    type="text" 
                    component={this.renderInput} 
                    label="Enter Title" 
                />
                <Field 
                    name="description" 
                    type="text" 
                    component={this.renderInput} 
                    label="Enter Description" 
                />
                <button className="ui button primary">Submit</button>
            </form>
        );
    };
};

const validate = values => {
    const errors = {};

    if(!values.title) {
        errors.title = 'You must enter a title';
    }

    if(!values.description) {
        errors.description = 'You must enter a description';
    }

    return errors;
}

export default reduxForm({
    form: 'streamForm',
    validate
})(StreamForm);
