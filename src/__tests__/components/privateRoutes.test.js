import { BrowserRouter } from 'react-router-dom';
import { create } from 'react-test-renderer';
import PrivateRoutes from '../../components/PrivateRoutes';

test('renders Correctly', () => {
  const Placeholder = () => (
    <BrowserRouter>
      <PrivateRoutes type="user">
        <div />
      </PrivateRoutes>
    </BrowserRouter>
  );
  const tree = create(<Placeholder />).toJSON();
  expect(tree).toMatchSnapshot();
});
