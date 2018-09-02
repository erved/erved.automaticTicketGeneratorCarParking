import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styles from './style';
import { Button, TextField, MenuItem } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const colorData = [
  {
    value: 'red',
    label: 'RED',
  },
  {
    value: 'black',
    label: 'BLACK',
  },
  {
    value: 'blue',
    label: 'BLUE',
  },
  {
    value: 'white',
    label: 'WHITE',
  }
];

let counter = 100;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reg: '',
      color: '',
      slot: '',
      rows: [],
    };
  }

  onExit = (id) => {
    let newitems = this.state.rows;
    this.setState({ rows: newitems.filter(item => item.slot !== id) });
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  clear = () => {
    this.setState({
      reg: '',
      color: '',
      slot: '',
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    counter -= 1;
    console.log(this.state.rows.find((e) => { e.slot === this.state.slot }));
    if (this.state.rows.find((e) => { return e.slot === this.state.slot }) === undefined) {
      this.setState({
        rows: this.state.rows.concat({ reg: this.state.reg, color: (this.state.color).toUpperCase(), slot: this.state.slot, }),
      });
    } else
      alert('already booked');
  }

  render() {
    const { reg, color, slot, rows } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <form onSubmit={this.handleSubmit}>
          <Paper>
            <TextField
              id="reg"
              label="Registration Number"
              name="reg"
              className={classes.textField}
              value={reg}
              onChange={this.onChange}
              margin="normal"
              required
              helperText="KA-01-HH-1234"
            />
            <TextField
              id="color"
              select
              label="Color"
              name="color"
              value={color}
              onChange={this.onChange}
              className={classes.select}
              margin="normal"
              required
            >
              {colorData.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="slot"
              label="Slot"
              name="slot"
              className={classes.textField}
              value={slot}
              onChange={this.onChange}
              margin="normal"
              InputProps={{ inputProps: { min: 0, max: 100 } }}
              required
              type="number"
              helperText="please enter between 1 to 100"
            />
            <Button variant="contained" color="primary" className={classes.button} type="submit">
              Generate
        </Button>
            <Button variant="contained" color="secondary" className={classes.button} onClick={this.clear}>
              Clear
        </Button>
            <label style={{ color: "green" }}>Available slot :{counter} </label>
          </Paper>
        </form>
        <Paper className={classes.root}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <CustomTableCell>Registration Number</CustomTableCell>
                <CustomTableCell>Color</CustomTableCell>
                <CustomTableCell>Slot</CustomTableCell>
                <CustomTableCell></CustomTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map(row => {
                return (
                  <TableRow className={classes.row} key={row.slot}>
                    <CustomTableCell component="th" scope="row">
                      {row.reg}
                    </CustomTableCell>
                    <CustomTableCell>{row.color}</CustomTableCell>
                    <CustomTableCell>{row.slot}</CustomTableCell>
                    <CustomTableCell>{
                      <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.onExit(row.slot)}>
                        Exit
                  <DeleteIcon className={classes.rightIcon} />
                      </Button>
                    }</CustomTableCell>

                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Paper>

      </div>
    );
  }
}

export default withStyles(styles)(App);
