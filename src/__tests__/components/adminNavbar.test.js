import { BrowserRouter } from 'react-router-dom';
import { create } from 'react-test-renderer';
import AdminNavBar from '../../components/adminNavbar';

test('renders Correctly', () => {
  const Placeholder = () => (
    <BrowserRouter>
      <AdminNavBar />
    </BrowserRouter>
  );
  const tree = create(<Placeholder />).toJSON();
  expect(tree).toMatchSnapshot();
});
