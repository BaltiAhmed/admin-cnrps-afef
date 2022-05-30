import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, Row, Col, Button } from "react-bootstrap";
import UpdateIcon from "@material-ui/icons/Update";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import TablePagination from "@material-ui/core/TablePagination";
import ErrorModel from "../../models/error-models";
import SuccessModel from "../../models/success-models";
import { Link } from "react-router-dom";
import DnsIcon from "@material-ui/icons/Dns";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import SearchIcon from "@material-ui/icons/Search";
import { Image } from "react-bootstrap";
import BlockIcon from "@material-ui/icons/Block";
import HowToRegIcon from "@material-ui/icons/HowToReg";
import AjoutBTN from "../../components/btnAjout";
import UserName from "../../components/user/user-name";
import UserAdresse from "../../components/user/user-adresse";
import UserEmail from "../../components/user/user-email";
import UserTel from "../../components/user/user-tel";
import ModalGalerie from "../../components/modalGalerie";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function PensionCivile() {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const [list, setList] = useState();
  const [error, seterror] = useState(null);
  const [success, setsuccess] = useState(null);

  useEffect(() => {
    const sendRequest = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/pensioncivile/`
        );

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.PensionC);
      } catch (err) {
        seterror(err.message);
      }
    };

    sendRequest();
  }, []);

  const [searchTerm, setSearchTerm] = useState("");

  const handelSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <Container>
      <Row>
        <Col></Col>
        <Col>
          <ErrorModel error={error} />
          <SuccessModel success={success} />

          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Nom</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Adresse</StyledTableCell>
                  <StyledTableCell>Téléphone</StyledTableCell>
                  <StyledTableCell>Galerie</StyledTableCell>
                  <StyledTableCell align="right">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {list &&
                  list
                    .filter((val) => {
                      if (searchTerm == "") {
                        return val;
                      } else if (val.nom.includes(searchTerm)) {
                        return val;
                      }
                    })
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => (
                      <StyledTableRow key={row.nom}>
                        <UserName id={row.utilisateurId} />
                        <UserEmail id={row.utilisateurId} />
                        <UserAdresse id={row.utilisateurId} />
                        <UserTel id={row.utilisateurId} />

                        <StyledTableCell>
                          <ModalGalerie id={row._id} />
                        </StyledTableCell>

                        <StyledTableCell>
                          <Button
                            onClick={async (event) => {
                              try {
                                let response = await fetch(
                                  `http://localhost:5000/api/pensioncivile/${row._id}`,
                                  {
                                    method: "PATCH",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                  }
                                );
                                let responsedata = await response.json();
                                if (!response.ok) {
                                  throw new Error(responsedata.message);
                                }
                                setList(
                                  list.filter((el) => el._id !== row._id)
                                );
                                setsuccess("Demande Bien valider");
                              } catch (err) {
                                console.log(err);
                                seterror(err.message || "il y a un probleme");
                              }

                              try {
                                let response = await fetch("http://localhost:5000/api/notification/addNotification", {
                                  method: "POST",
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    sujet: "Demande pension cevil",
                                    message: "Votre demande de pension civil est bien pris en charge",
                                    idUtilisateur: row.utilisateurId,
                                  }),
                                });
                                let responsedata = await response.json();
                                if (!response.ok) {
                                  throw new Error(responsedata.message);
                                }
                                setsuccess("Réponse bien ajouter");
                              } catch (err) {
                                console.log(err);
                                seterror(err.message || "probleme!!");
                              }
                            }}
                            variant="primary"
                          >
                            Valider la demande
                          </Button>
                        </StyledTableCell>

                        {/* <StyledTableCell align="right">
                          <Link to={`/agence-update/${row._id}`}>
                            <UpdateIcon style={{ color: "green" }}></UpdateIcon>
                          </Link>

                          <DeleteForeverIcon
                            style={{ color: "red" }}
                            onClick={async (event) => {
                              try {
                                let response = await fetch(
                                  `http://localhost:5000/api/agence/${row._id}`,
                                  {
                                    method: "DELETE",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                  }
                                );
                                let responsedata = await response.json();
                                if (!response.ok) {
                                  throw new Error(responsedata.message);
                                }
                                setList(
                                  list.filter((el) => el._id !== row._id)
                                );
                                setsuccess("Agence bien suprimer");
                              } catch (err) {
                                console.log(err);
                                seterror(err.message || "il y a un probleme");
                              }
                            }}
                          ></DeleteForeverIcon>
                        </StyledTableCell> */}
                      </StyledTableRow>
                    ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10]}
            component="div"
            count={list && list.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Col>
        <Col></Col>
      </Row>
    </Container>
  );
}
