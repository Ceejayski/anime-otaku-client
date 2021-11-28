import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { create } from 'react-test-renderer';
import Details from '../../components/details';
import store from '../../redux';

test('renders Correctly', () => {
  const Placeholder = () => (
    <Provider store={store}>
      <BrowserRouter>
        <Details
          data={{
            id: 1,
            attributes: { rating: null, name: null, genre_list: [], description: '', header_image: { url: null } },
          }}
          favorite={() => true}
          addFave={() => true}
          removeFave={() => true}
        />
      </BrowserRouter>
    </Provider>
  );
  const tree = create(<Placeholder />).toJSON();
  expect(tree).toMatchSnapshot();
});
