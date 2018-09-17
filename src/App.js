import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Hidden from '@material-ui/core/Hidden';
import './style.css';

const options = [
  'Delete',
  'View Details',
];

class ResponsiveTable extends React.Component {
  constructor(props) {
    super(props);
    let list = [];
    /*
    Here we manually create the elements in the list using createItem(). Using onAddItem() would lead to an error ("cannot call setState on an unmounted component"). In the constructor, the component has not yet finished mounting, so we are unable to modify the state via setState (it hasn't been initialized yet). The details of the setState call also include a re-render of the component, which cannot happen if the component has not finished initializing. So we have to directly instantiate the value of the list in the constructor. 
    */
    for (var i = 0; i < 10; i++) {
      list.push(this.createRandomItem(i));
    }
    this.state = {
      list: list,
      menuposition: null,
      selectedIndex: null,
      activeMenu: null
    }

  }

  onAddItem() {
    let templist = this.state.list;
    templist.push(this.createRandomItem());
    this.setState({ list: templist });
  }
  createItem(index) {
    return { id: index, name: `Item ${index}`, details: `Item ${index} occured` };
  }
  createRandomItem() {
    const int = parseInt((Math.random() * 100) + '', 10);
    return this.createItem(int);
  }
  onSelected(item) {
    this.setState({ selectedIndex: item });
  }
  isSelected(item) {
    return this.state.selectedIndex === item;
  }

  getEmptyComponent() {
    return (
      <div style={{ paddingLeft: "10px" }}>
        <Typography variant="display1">No Items Found</Typography>
        <Button variant="contained" onClick={() => this.onAddItem()}>Add an Item</Button>
      </div>
    );
  }

  render() {
    const { menuposition } = this.state;

    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="title" color="inherit">
              Responsive Table
          </Typography>
          </Toolbar>
        </AppBar>
        {this.state.list.length < 1 &&
          this.getEmptyComponent()
        }
        <Hidden mdUp>
          <List style={{paddingLeft: '0px'}} component="nav">
            {
              this.state.list.map((item, i) => {
                return (
                  <ListItem key={'item_' + i} button className={this.isSelected(i) ? 'selected' : null} onClick={() => this.onSelected(i)}>
                    <ListItemText primary={item.name} secondary={item.details}></ListItemText>
                  </ListItem>
                )
              })
            }
          </List>
        </Hidden>
        <Hidden smDown>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell numeric>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.list.map((item, i) => {
                return (
                  <TableRow key={'item_' + i} className={this.isSelected(i) ? 'selected' : null} onClick={() => this.onSelected(i)}>
                    <TableCell component="th" scope="row">
                      {item.name}
                    </TableCell>
                    <TableCell numeric>{item.details}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Hidden>
      </div>
    );
  }
}

export default ResponsiveTable;

