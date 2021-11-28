import { BrowserRouter } from 'react-router-dom';
import { create } from 'react-test-renderer';
import AnimeCard from '../../components/animeCard';

test('renders Correctly', () => {
  const Placeholder = () => (
    <BrowserRouter>
      <AnimeCard
        data={{
          id: 1,
          attributes: { rating: null, name: null, genre_list: [], header_image: { url: null } },
        }}
      />
    </BrowserRouter>
  );
  const tree = create(<Placeholder />).toJSON();
  expect(tree).toMatchSnapshot();
});
