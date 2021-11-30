import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { create } from 'react-test-renderer';
import NavBar from '../../containers/navBar';
import store from '../../redux';

test('renders Correctly', () => {
  const Placeholder = () => (
    <Provider store={store}>
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    </Provider>
  );
  const tree = create(<Placeholder />).toJSON();
  expect(tree).toMatchSnapshot();
});
