import { create } from 'react-test-renderer';
import Jumbroton from '../../components/jumbotron';

test('renders Correctly', () => {
  const Placeholder = () => (

    <Jumbroton />
  );
  const tree = create(<Placeholder />).toJSON();
  expect(tree).toMatchSnapshot();
});
