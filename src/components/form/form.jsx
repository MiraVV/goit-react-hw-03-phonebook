import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { nanoid } from 'nanoid';
import {
  InputForm,
  FormField,
  FormFieldInput,
  FieldName,
  ButtonAddContact,
} from './form.styled';

class Form extends Component {
  state = {
    name: '',
    number: '',
  };

  name = nanoid();

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { name, number } = this.state;
    this.props.onSubmit({ name, number });
    this.reset();
  };
  reset = () => {
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <InputForm onSubmit={this.handleSubmit}>
        <FormField>
          <FieldName htmlFor="this.name">Name</FieldName>
          <FormFieldInput
            id="this.name"
            type="text"
            value={this.state.name}
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            onChange={this.handleChange}
          ></FormFieldInput>
        </FormField>
        <FormField>
          <FieldName htmlFor="this.name">Number</FieldName>
          <FormFieldInput
            id="this.name"
            type="tel"
            value={this.state.number}
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            onChange={this.handleChange}
          ></FormFieldInput>
        </FormField>
        <ButtonAddContact type="submit" className="InputFieldButton">
          Add contact
        </ButtonAddContact>
      </InputForm>
    );
  }
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
