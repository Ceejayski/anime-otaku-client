import { BrowserRouter } from 'react-router-dom';
import { create } from 'react-test-renderer';
import AdminSideBar from '../../components/adminSideBar';

test('renders Correctly', () => {
  const Placeholder = () => (
    <BrowserRouter>
      <AdminSideBar />
    </BrowserRouter>
  );
  const tree = create(<Placeholder />).toJSON();
  expect(tree).toMatchSnapshot();
});
