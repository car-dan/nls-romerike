import Layout from "./components/layout/Layout";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Index";
import Nyheter from "./pages/nyheter/Index";
import Kurs from "./pages/kurs/Index";
import Login from "./pages/login/Index";
import Kontakt from "./pages/kontakt/Index";
import ContactAut from "./pages/kontakt/ContactAut";
import ContactAuthItem from "./pages/kontakt/ContactAuthItem";
import OmOss from "./pages/omOss/Index";
import Footer from "./components/footer/Footer";
import Header from "./components/header/Header";
import NewsArticle from "./pages/newsArticle/Index";
import SignUp from "./pages/signUp/Index";
import AddNews from "./pages/addNews/AddNews";
import { AuthProvider } from "./components/contex/AuthContex";
import SignUpList from "./pages/signUp/SignUpList";
import SignUpAuth from "./pages/signUp/SignUpAuth";
import EditNewsArticle from "./pages/newsArticle/EditNewsArticle";
import AddKurs from "./pages/kurs/AddKurs";
import AddKursSpecific from "./pages/kurs/AddKursSpecific";
import AddKursNew from "./pages/kurs/AddKursNew";

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <Layout>
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/nyheter" exact element={<Nyheter />} />
            <Route path="/addNyhet" exact element={<AddNews />} />
            <Route path="/nyhet/:id" exact element={<NewsArticle />} />
            <Route path="/nyhet/edit/:id" exact element={<EditNewsArticle />} />
            <Route path="/kontakt" exact element={<Kontakt />} />
            <Route path="/om" exact element={<OmOss />} />
            <Route path="/login" exact element={<Login />} />
            <Route path="/kurs/:name" exact element={<Kurs />} />
            <Route path="/kurs/pamelding/:id" exact element={<SignUp />} />
            <Route path="/kurs/pamelding" exact element={<SignUpList />} />
            <Route path="/kurs/add" exact element={<AddKurs />} />
            <Route path="/kurs/addNew" exact element={<AddKursNew />} />
            <Route path="/kurs/add/:id" exact element={<AddKursSpecific />} />
            <Route path="/pamelding/auth/:id" exact element={<SignUpAuth />} />
            <Route path="/kontakt/auth" exact element={<ContactAut />} />
            <Route path="/kontakt/:id" exact element={<ContactAuthItem />} />
          </Routes>
        </Layout>
        <Footer />
      </AuthProvider>
    </>
  );
}

export default App;
