import React from 'react';
import { ValidationForm, BaseFormControl } from "react-bootstrap4-form-validation"
import MaskedInput from 'react-text-mask'

//Need to extends BaseFormControl to have the validation feature
class MaskWithValidation extends BaseFormControl{
    constructor(props){
        super(props);
        this.inputRef = React.createRef();
    }

    //Need to implement this method to get the underying input reference
    getInputRef(){
        return this.inputRef.current.inputElement;
    }

    handleChange = (e) => {
        //Call this.checkError to validate the input
        this.checkError();
        //Pass along the event object for controlled component
        if(this.props.onChange) this.props.onChange(e);
    }

    render () {
        return (
            <React.Fragment>
                <MaskedInput ref={this.inputRef} {...this.filterProps()} onChange={this.handleChange}/>
                {/* Call this.displayErrorMessage() to render the error message div if error */}
                { this.displayErrorMessage() }
                {/* Call this.displaySuccessMessage() to render the success message div if no error*/}
                { this.displaySuccessMessage() }
            </React.Fragment>
        )
    }
}

export default MaskWithValidation;