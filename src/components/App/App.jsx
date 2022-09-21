import React, { Component } from 'react';
import Form from '../form/form';
import ListContact from '../listContacts/listContacts';
import { Filter } from '../filter/filter';
import { Wrapper } from './App.styled';
import { nanoid } from 'nanoid';
import ErrorComponent from '../ErrorComponent/ErrorComponent';

class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const contacts = JSON.parse(localStorage.getItem('contacts'));
    if (contacts && contacts.length) {
      this.setState({
        contacts,
      });
    }
  }

  componentDidUpdate(_, prevState) {
    const { contacts } = this.state;
    if (prevState.contacts !== contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  addContact = contact => {
    if (this.isDuplicate(contact)) {
      return alert(`${contact.name} is already in contacts`);
    }
    this.setState(prev => {
      const newContact = {
        id: nanoid(),
        ...contact,
      };
      return {
        contacts: [...prev.contacts, newContact],
      };
    });
  };

  removeContact = id => {
    this.setState(prev => {
      const newContacts = prev.contacts.filter(item => item.id !== id);
      return {
        contacts: newContacts,
      };
    });
  };

  handleChange = e => {
    const { name, value } = e.currentTarget;
    this.setState({ [name]: value });
  };

  isDuplicate({ name }) {
    const { contacts } = this.state;
    const result = contacts.find(item => item.name === name);
    return result;
  }

  getFilteredContacts() {
    const { contacts, filter } = this.state;
    if (!filter) {
      return contacts;
    }
    const normalizeFilter = filter.toLocaleLowerCase();
    const filterContacts = contacts.filter(({ name }) => {
      const normalizeName = name.toLocaleLowerCase();
      const result = normalizeName.includes(normalizeFilter);
      return result;
    });
    return filterContacts;
  }

  render() {
    const { addContact, removeContact, handleChange } = this;
    const contacts = this.getFilteredContacts();
    return (
      <Wrapper>
        <ErrorComponent>
          <h1>Phonebook</h1>
          <Form onSubmit={addContact} />
          <h1>Contacts</h1>
          <Filter value="filter" onChange={handleChange} />
          <ListContact items={contacts} removeContact={removeContact} />
        </ErrorComponent>
      </Wrapper>
    );
  }
}
export default App;
