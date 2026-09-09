import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import AboutUs from './components/AboutUs'
import Products from './components/Products'
import ProductDetails from './components/ProductDetails'
import Services from './components/Services'
import Blogs from './components/Blogs'
import BlogDetails from './components/BlogDetails'
import Contact from './components/Contact'
import LegalPage from './components/LegalPage'
import NotFound from './components/NotFound'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import AIChatWidget from './components/AIChatWidget'
import './App.css'

function App() {
  return (
    <>
    <ScrollToTop />
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:slug" element={<ProductDetails />} />
      <Route path="/services" element={<Services />} />
      <Route path="/blogs" element={<Blogs />} />
      <Route path="/blogs/:slug" element={<BlogDetails />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/privacy-policy" element={<LegalPage title="Privacy Policy" />} />
      <Route path="/terms" element={<LegalPage title="Terms of Service" />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
    <Footer />
    <AIChatWidget />
    </>
  )
}

export default App
