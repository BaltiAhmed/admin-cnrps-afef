import React, { useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import NavLogin from "./components/nav-login";
import { Authcontext } from "./context/auth-context";
import { UserAuth } from "./hooks/Auth-houks";
import { FinanciereAuth } from "./hooks/Auth-houks-financiere";
import Login from "./pages/login";
import NavBar from "./components/nav-bar";
import Home from "./pages/home";
import image from "./images/cool-background.png";
import ListUser from "./pages/users/list";
import ListAgence from "./pages/agences/list";
import AjoutAgence from "./pages/agences/ajout";
import UpdateAgence from "./pages/agences/update";
import ListReclamation from "./pages/reclamation/list";
import DetailsReclamation from "./pages/reclamation/details";
import PensionCivile from "./pages/pension/pension-civile";
import PensionRetraite from "./pages/pension/pension-retraite"
import PensionConjoint from "./pages/pension/pension-conjoint"
import PensionOrphelin from "./pages/pension/pension-Orphelin"
import AttestationAffiliation from "./pages/attestation/attestation-affiliation"
import AttestationNonAffiliation from "./pages/attestation/attestation-non-affiliation"
import AttestationNonBenifisPret from "./pages/attestation/attestation-non-benifis-pret"
import Allocation from "./pages/pension/allocation"
import CapitalDeces from "./pages/pension/capital-deces"
import PretPersonel from "./pages/pension/pret-personel"
import PretUnversitaire from "./pages/pension/pret-universitaire"

function App() {
  const { user, token, login, logout } = UserAuth();
  const { financiere, tokenFinanciere, loginFinanciere, logoutFinanciere } =
    FinanciereAuth();

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/user-list" exact element={<ListUser/>} />
        <Route path="/agence-list" exact element={<ListAgence/>} />
        <Route path="/agence-ajout" exact element={<AjoutAgence/>} />
        <Route path="/agence-update/:id" exact element={<UpdateAgence/>} />
        <Route path="/list-reclamation" exact element={<ListReclamation/>} />
        <Route path="/details-reclamation/:id" exact element={<DetailsReclamation/>} />
        <Route path="/pension-civile" exact element={<PensionCivile/>} />
        <Route path="/pension-retraite" exact element={<PensionRetraite/>} />
        <Route path="/pension-conjoint" exact element={<PensionConjoint/>} />
        <Route path="/pension-orphelin" exact element={<PensionOrphelin/>} />
        <Route path="/attestation-affiliation" exact element={<AttestationAffiliation/>} />
        <Route path="/attestation-non-affiliation" exact element={<AttestationNonAffiliation/>} />
        <Route path="/attestation-non-benifis-pret" exact element={<AttestationNonBenifisPret/>} />
        <Route path="/Allocation" exact element={<Allocation/>} />
        <Route path="/pret-personel" exact element={<PretPersonel/>} />
        <Route path="/pret-universitaire" exact element={<PretUnversitaire/>} />
      </Routes>
    );
  } else {
    routes = (
      <Routes>
        <Route path="/" exact element={<Login/>} />
      </Routes>
    );
  }
  return (
    <div
      style={{
        backgroundImage: "url(" + image + ")",
        backgroundSize: "cover",
        /* backgroundRepeat: "no-repeat", */
        position: "absolute",
        /* height: "100vh", */
        width: "100%",
        backgroundPosition: "center",
      }}
    >
      <Authcontext.Provider
        value={{
          user: user,
          token: token,
          login: login,
          logout: logout,
          financiere: financiere,
          tokenFinanciere: tokenFinanciere,
          loginFinanciere: loginFinanciere,
          logoutFinanciere: logoutFinanciere,
        }}
      >
        <BrowserRouter>
          {!token && <NavLogin />}
          {!token && routes}
          {token && <NavBar centent={routes} />}
        </BrowserRouter>
      </Authcontext.Provider>
    </div>
  );
}

export default App;
