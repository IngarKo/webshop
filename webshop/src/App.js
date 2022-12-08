import { Link, Route,Routes } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './App.css';
import AddProduct from './pages/admin/AddProduct';
import AdminHome from './pages/admin/AdminHome';
import EditProduct from './pages/admin/EditProduct';
import MaintainProduct from './pages/admin/MaintainProduct';
import MaintainShops from './pages/admin/MaintainShops';
import Cart from './pages/Cart';
import HomePage from './pages/HomePage';
import Shops from './pages/Shops';
import SingleProduct from './pages/SingleProduct';
import { useTranslation } from 'react-i18next';
import { ContactUs } from './pages/ContactUs';
import MaintainCategories from './pages/admin/MaintainCategories';


function App() {
  const { t, i18n } = useTranslation();

  const changeLang = (newLang) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  };

  return (
    <div>

      <Navbar bg="primary" variant="blue">
        <Container>
          <Navbar.Brand as={Link} to="/">Webshop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin">{t('admin')}</Nav.Link>
            <Nav.Link as={Link} to="/shops">{t('shops')}</Nav.Link>
            <Nav.Link as={Link} to="/cart"> {t('cart')}</Nav.Link>
            <Nav.Link as={Link} to="/contact"> {t('contact')}</Nav.Link>
          </Nav>
          <img className='lang' src="/estonia.png" alt="" onClick={() => changeLang("ee")}/>
          <img className='lang' src="/uk.png" alt="" onClick={() => changeLang("en")}/>
          <img className='lang' src="/russia.png" alt="" onClick={() => changeLang("ru")}/>
        </Container>
        
      </Navbar>

      <Routes>
        <Route path='' element={<HomePage/>} />
        <Route path='cart' element={<Cart/>} />
        <Route path='shops' element={<Shops/>} />
        <Route path='admin' element={<AdminHome/>} />
        <Route path='product/:id' element={<SingleProduct/>} />
        <Route path='contact' element={<ContactUs/>} />
        <Route path='admin/add-product' element={<AddProduct/>} />
        <Route path='admin/edit-product/:id' element={<EditProduct/>} />
        <Route path='admin/maintain-products' element={<MaintainProduct/>} />
        <Route path='admin/maintain-shops' element={<MaintainShops/>} />
        <Route path='admin/maintain-categories' element={<MaintainCategories/>} />
        
      </Routes>
    </div>
  );
}

export default App;
