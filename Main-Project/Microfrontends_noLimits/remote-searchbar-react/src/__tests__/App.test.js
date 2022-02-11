import { shallow } from 'enzyme';

import App from 'App';
import Search from 'components/Search';

let wrapped;

beforeEach(() => {
    wrapped = shallow(<App />);
});

it('shows the search bar', () => {
    expect(wrapped.find(Search).length).toEqual(1);
});