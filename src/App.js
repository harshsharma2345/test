import logo from "./logo.svg";
import "./App.css";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";
import Itemform from "./components/Itemform";
import Supplierform from "./components/Supplierform";
import TableList from "./components/TableList";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

function App() {
  const [itemDetails, setItemDetails] = useState(false);
  const [supplierDetails, setSupplierDetails] = useState(false);

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Inventory Management System
            </Typography>
            <Button color="inherit">Home</Button>
          </Toolbar>
        </AppBar>
      </Box>
      <div className="checkBoxGroup">
        <FormGroup style={{ display: "flex", flexDirection: "row" }}>
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => {
                  itemDetails ? setItemDetails(false) : setItemDetails(true);
                }}
              />
            }
            label="Item"
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={() => {
                  supplierDetails
                    ? setSupplierDetails(false)
                    : setSupplierDetails(true);
                }}
              />
            }
            label="Supplier"
          />
        </FormGroup>
      </div>
      <div className="itemForm">
        <Itemform />
      </div>
      <br />
      <TableList />
    </div>
  );
}

export default App;
