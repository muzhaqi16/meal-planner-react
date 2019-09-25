import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TextInput from './TextInput';
describe('TextInput Component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TextInput />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('renders the UI as expected', () => {
        const input = renderer
            .create(<TextInput />)
            .toJSON();
        expect(input).toMatchSnapshot();
    });
})
