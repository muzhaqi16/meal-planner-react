import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TextArea from './TextArea';
describe('TextArea Component', () => {
    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<TextArea />, div);
        ReactDOM.unmountComponentAtNode(div);
    });
    it('renders the UI as expected', () => {
        const input = renderer
            .create(<TextArea />)
            .toJSON();
        expect(input).toMatchSnapshot();
    });
})
