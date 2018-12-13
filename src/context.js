import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

const reducer = (state, action) => {
  switch (action.type) {

      case 'DELETE_CONTACT':
        return {
            ...state,
            contacts: state.contacts.filter(
                contact => contact.id !== action.payload
            )
        };

      case 'ADD_CONTACT':
          return {
              ...state,
              contacts: [action.payload,
                         ...state.contacts]
          };

      case 'UPDATE_CONTACT':
          return {
              ...state,
              contacts: state.contacts.map(contact => contact.id === action.payload.id
                  ? (contact = action.payload)
                  : contact),
          };

      default:
        return state;
  }
}

export class Provider extends Component {
  state = {
    // contacts: [
    //   {
    //     id: 1,
    //     name: 'Elena Pavleska',
    //     email: 'elena.pavleska@telego.rs',
    //     phone: '111-111-1111'
    //   },
    //   {
    //     id: 2,
    //     name: 'Vukasin Stankovic',
    //     email: 'vukasin.stankovic@telego.rs',
    //     phone: '222-222-2222'
    //   },
    //   {
    //     id: 3,
    //     name: 'Nikola Ristivojevic',
    //     email: 'nikola.ristivojevic@telego.rs',
    //     phone: '333-333-3333'
    //   }
    // ],
      contacts: [],
      dispatch: action => this.setState(state => reducer(state, action))
  };

    async componentDidMount() {
        const res = await axios
            .get('https://jsonplaceholder.typicode.com/users');

        this.setState({ contacts: res.data })

        // ovo je ako nemamo async
            // .then(res => this.setState({ contacts:res.data }))
    }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export const Consumer = Context.Consumer;
