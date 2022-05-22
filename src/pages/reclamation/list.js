import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { Container, Row, Col } from "react-bootstrap";
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
import DetailsIcon from '@material-ui/icons/Details';

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

export default function ListReclamation() {
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
        const response = await fetch(`http://localhost:5000/api/reclamation/`);

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }

        setList(responseData.rec);
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

          <InputLabel htmlFor="input-with-icon-adornment">Chercher</InputLabel>
          <Input
            id="input-with-icon-adornment"
            startAdornment={
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            }
            onChange={handelSearch}
          />
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="right">Objet</StyledTableCell>
                  <StyledTableCell align="right">Message</StyledTableCell>
                  <StyledTableCell align="right">Détails</StyledTableCell>
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
                        <StyledTableCell component="th" scope="row">
                          {row.objet}
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          {row.message}
                        </StyledTableCell>
                        
                        <StyledTableCell align="right">
                          <Link to={`/details-reclamation/${row._id}`}>
                            <DetailsIcon style={{ color: "green" }}></DetailsIcon>
                          </Link>

                          
                        </StyledTableCell>
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
