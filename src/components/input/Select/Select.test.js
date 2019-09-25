import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import Select from './Select';

describe('Select Component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Select />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('renders the UI as expected', () => {
        const select = renderer
            .create(<Select />)
            .toJSON();
        expect(select).toMatchSnapshot();
    });
})