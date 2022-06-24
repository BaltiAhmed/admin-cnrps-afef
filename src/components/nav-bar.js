import React, { useContext } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import HomeIcon from "@material-ui/icons/Home";
import SupervisorAccountIcon from "@material-ui/icons/SupervisorAccount";
import BallotIcon from "@material-ui/icons/Ballot";
import { Link } from "react-router-dom";
import SimpleMenu from "./NavBarMenu";
import BookIcon from "@material-ui/icons/Book";
import ArchiveIcon from "@material-ui/icons/Archive";
import { Authcontext } from "../context/auth-context";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "flex-end",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const auth = useContext(Authcontext);

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            CNRPS
          </Typography>
          <SimpleMenu />
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        {auth.user.type == "R" && (
          <List>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <ListItem button key="">
                <ListItemIcon>
                  {" "}
                  <HomeIcon style={{ color: "#039be5" }} />
                </ListItemIcon>
                <ListItemText primary="Acceuil" />
              </ListItem>
            </Link>
            <Link
              to="/user-list"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem button key="">
                <ListItemIcon>
                  {" "}
                  <SupervisorAccountIcon style={{ color: "#039be5" }} />
                </ListItemIcon>
                <ListItemText primary="Gestion des utilisateurs" />
              </ListItem>
            </Link>
            <Link
              to="/agence-list"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem button key="">
                <ListItemIcon>
                  {" "}
                  <BallotIcon style={{ color: "#039be5" }} />
                </ListItemIcon>
                <ListItemText primary="Gestion des Agences" />
              </ListItem>
            </Link>

            <Link
              to="/list-reclamation"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem button key="">
                <ListItemIcon>
                  {" "}
                  <BookIcon style={{ color: "#039be5" }} />
                </ListItemIcon>
                <ListItemText primary="Gestion des reclamations" />
              </ListItem>
            </Link>
          </List>
        )}

        <Divider />
        {auth.user.type == "RP" && (
          <List>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <ListItem button key="">
                <ListItemIcon>
                  {" "}
                  <HomeIcon style={{ color: "#039be5" }} />
                </ListItemIcon>
                <ListItemText primary="Acceuil" />
              </ListItem>
            </Link>
            
            <Link
              to="/pension-retraite"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem button key="">
                <ListItemIcon>
                  {" "}
                  <ArchiveIcon style={{ color: "#039be5" }} />
                </ListItemIcon>
                <ListItemText primary="Pensions retraite" />
              </ListItem>
            </Link>
            <Link
              to="/pension-conjoint"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem button key="">
                <ListItemIcon>
                  {" "}
                  <ArchiveIcon style={{ color: "#039be5" }} />
                </ListItemIcon>
                <ListItemText primary="Pensions Conjoint Survivant" />
              </ListItem>
            </Link>
            <Link
              to="/pension-orphelin"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem button key="">
                <ListItemIcon>
                  {" "}
                  <ArchiveIcon style={{ color: "#039be5" }} />
                </ListItemIcon>
                <ListItemText primary="Pensions Temporaire Orphelin" />
              </ListItem>
            </Link>
            <Link
              to="/allocation"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem button key="">
                <ListItemIcon>
                  {" "}
                  <ArchiveIcon style={{ color: "#039be5" }} />
                </ListItemIcon>
                <ListItemText primary="Allocation de vieillesse" />
              </ListItem>
            </Link>

            <Link
              to="/Capital-deces"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem button key="">
                <ListItemIcon>
                  {" "}
                  <ArchiveIcon style={{ color: "#039be5" }} />
                </ListItemIcon>
                <ListItemText primary="Capital décés" />
              </ListItem>
            </Link>
            <Link
              to="/pret-personel"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem button key="">
                <ListItemIcon>
                  {" "}
                  <ArchiveIcon style={{ color: "#039be5" }} />
                </ListItemIcon>
                <ListItemText primary="Prèt personnel" />
              </ListItem>
            </Link>

            <Link
              to="/pret-universitaire"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem button key="">
                <ListItemIcon>
                  {" "}
                  <ArchiveIcon style={{ color: "#039be5" }} />
                </ListItemIcon>
                <ListItemText primary="Prèt universitaire" />
              </ListItem>
            </Link>
          </List>
        )}
        {auth.user.type == "RA" && (
          <List>
            <Link to="/" style={{ textDecoration: "none", color: "black" }}>
              <ListItem button key="">
                <ListItemIcon>
                  {" "}
                  <HomeIcon style={{ color: "#039be5" }} />
                </ListItemIcon>
                <ListItemText primary="Acceuil" />
              </ListItem>
            </Link>
            <Link
              to="/attestation-affiliation"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem button key="">
                <ListItemIcon>
                  {" "}
                  <ArchiveIcon style={{ color: "#039be5" }} />
                </ListItemIcon>
                <ListItemText primary="Demande d'attestation d'affiliation" />
              </ListItem>
            </Link>
            <Link
              to="/attestation-non-affiliation"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem button key="">
                <ListItemIcon>
                  {" "}
                  <ArchiveIcon style={{ color: "#039be5" }} />
                </ListItemIcon>
                <ListItemText primary="Demande d'attestation de non affiliation" />
              </ListItem>
            </Link>

            <Link
              to="/attestation-non-benifis-pret"
              style={{ textDecoration: "none", color: "black" }}
            >
              <ListItem button key="">
                <ListItemIcon>
                  {" "}
                  <ArchiveIcon style={{ color: "#039be5" }} />
                </ListItemIcon>
                <ListItemText primary="Demande d'attestation de non benifis prèt" />
              </ListItem>
            </Link>
          </List>
        )}
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        {props.centent}
      </main>
    </div>
  );
}
